import { API_URL } from "../../constants/apiUrl";
import type { QuotationPayload } from "../interfaces/quotation.interface";

export const downloadQuotationPdf = async (
  body: QuotationPayload,
): Promise<Blob> => {
  try {
    const response = await fetch(`${API_URL}/quotations/pdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || "Error al generar el PDF de la cotización",
      );
    }

    return await response.blob();
  } catch (error) {
    console.error("Error en downloadQuotationPdf:", error);
    throw error;
  }
};
