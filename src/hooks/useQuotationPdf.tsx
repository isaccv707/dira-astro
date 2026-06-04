import { useState } from "react";
import type { QuotationPayload } from "../api/interfaces/quotation.interface";
import type { Client } from "../interfaces/client.interface";
import type { Study } from "../interfaces/study.interface";
import { toast } from "react-toastify";
import { downloadQuotationPdf } from "../api/quotationsApi/quotationApi";
// Importamos la función fetch que creamos antes

interface useQuotationPdfProps {
  client: Client | null;
  selectedStudies: Study[];
}

const useQuotationPdf = ({ client, selectedStudies }: useQuotationPdfProps) => {
  // Reemplazamos el hook de Redux por estados locales
  const [isLoading, setIsLoading] = useState(false);
  const [currentAction, setCurrentAction] = useState<
    "view" | "download" | null
  >(null);

  const hasClient = Boolean(client);
  const hasStudies = selectedStudies.length > 0;

  const buildPayload = (): QuotationPayload | null => {
    if (!hasClient || !client) {
      toast.error("Primero llena la información del cliente.");
      return null;
    }

    if (!hasStudies) {
      toast.error("Debes seleccionar al menos un estudio para cotizar.");
      return null;
    }

    const payloadStudies = selectedStudies.map((study) => ({
      id: study.id,
      name: study.name,
      price: study.priceInfo.price,
      quantity: study.quantity,
    }));

    return {
      clientType: client.clientType,
      name: client.name,
      lastName: client?.lastName,
      phoneNumber: client.phoneNumber,
      email: client?.email,
      studies: payloadStudies,
    };
  };

  const generateBlob = async (action: "view" | "download") => {
    const payload = buildPayload();
    if (!payload) return null;

    try {
      setIsLoading(true);
      setCurrentAction(action);

      // Llamada directa a fetch
      const blob = await downloadQuotationPdf(payload);
      return blob;
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al generar la cotización en PDF.");
      return null;
    } finally {
      setIsLoading(false);
      setCurrentAction(null);
    }
  };

  const downloadQuotation = async () => {
    const blob = await generateBlob("download");
    if (!blob) return;

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cotizacion-${client?.name?.replace(/\s+/g, "_") || "dyra"}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    setTimeout(() => window.URL.revokeObjectURL(url), 10000);
    toast.success("Cotización descargada con éxito");
  };

  const viewQuotation = async () => {
    const blob = await generateBlob("view");
    if (!blob) return;

    const url = window.URL.createObjectURL(blob);
    window.open(url, "_blank");

    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 10000);
  };

  return {
    downloadQuotation,
    viewQuotation,
    isLoading,
    hasClient,
    hasStudies,
    isDownloading: isLoading && currentAction === "download",
    isViewing: isLoading && currentAction === "view",
  };
};

export default useQuotationPdf;
