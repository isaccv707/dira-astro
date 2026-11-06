import { useState } from "react";
import type { QuotationPayload } from "../api/quotationsApi/quotation.interface";
import type { Client } from "../interfaces/client.interface";
import type { Study } from "../interfaces/study.interface";
import type { QuoterService } from "../utils/quoterStudies";
import { toast } from "react-toastify";
import { generateQuotationPdf } from "../api/quotationsApi/quotationApi";
import { resolveBranchId } from "../stores/branchStore";

interface UseQuotationPdfProps {
  selectedStudies: Study[];
  selectedService: QuoterService | null;
}

type Action = "view" | "download";

/**
 * Builds the PDF through POST /quotations/pdf. The client is passed per call
 * (right after the form validates) so the request never uses stale data.
 */
const useQuotationPdf = ({ selectedStudies, selectedService }: UseQuotationPdfProps) => {
  const [currentAction, setCurrentAction] = useState<Action | null>(null);

  const buildPayload = (client: Client): QuotationPayload | null => {
    if (selectedStudies.length === 0) {
      toast.error("Agrega al menos un estudio para cotizar.");
      return null;
    }
    const branchId = resolveBranchId();
    if (!branchId) {
      toast.error("Elige una sucursal antes de continuar.");
      return null;
    }
    if (!selectedService?.priceSheetId) {
      toast.error("Este servicio no tiene lista de precios en tu sucursal.");
      return null;
    }
    return {
      clientType: client.clientType,
      name: client.name,
      lastName: client.lastName,
      phoneNumber: client.phoneNumber,
      email: client.email,
      studies: selectedStudies.map((study) => ({
        id: study.id,
        name: study.name,
        price: Number(study.priceInfo.price),
        quantity: study.quantity ?? 1,
      })),
      branchId,
      priceSheetId: selectedService.priceSheetId,
    };
  };

  const generate = async (client: Client, action: Action): Promise<Blob | null> => {
    const payload = buildPayload(client);
    if (!payload) return null;
    try {
      setCurrentAction(action);
      return await generateQuotationPdf(payload);
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "No pudimos generar la cotización. Intenta de nuevo.",
      );
      return null;
    } finally {
      setCurrentAction(null);
    }
  };

  /** Resolves true when the PDF was downloaded. */
  const downloadQuotation = async (client: Client): Promise<boolean> => {
    const blob = await generate(client, "download");
    if (!blob) return false;
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `cotizacion-dyra-${client.name.trim().replace(/\s+/g, "_") || "cliente"}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => window.URL.revokeObjectURL(url), 10000);
    return true;
  };

  /**
   * Shows the PDF in `tab`, a window the caller opened synchronously in the
   * click handler (pop-up blockers reject windows opened after an await).
   */
  const viewQuotation = async (client: Client, tab: Window | null): Promise<boolean> => {
    const blob = await generate(client, "view");
    if (!blob) {
      tab?.close();
      return false;
    }
    const url = window.URL.createObjectURL(blob);
    if (tab) tab.location.href = url;
    else window.open(url, "_blank");
    setTimeout(() => window.URL.revokeObjectURL(url), 60000);
    return true;
  };

  return {
    downloadQuotation,
    viewQuotation,
    isDownloading: currentAction === "download",
    isViewing: currentAction === "view",
    isBusy: currentAction !== null,
  };
};

export default useQuotationPdf;
