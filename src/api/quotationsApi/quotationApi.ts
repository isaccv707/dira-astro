import { API_URL } from "../../constants/apiUrl";
import type { QuotationPayload } from "./quotation.interface";

const extractErrorMessage = (errorData: unknown, fallback: string): string => {
  if (errorData && typeof errorData === "object" && "message" in errorData) {
    const message = (errorData as { message?: unknown }).message;
    if (Array.isArray(message)) return message.join("\n");
    if (typeof message === "string") return message;
  }
  return fallback;
};

export const generateQuotationPdf = async (
  body: QuotationPayload,
): Promise<Blob> => {
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
      extractErrorMessage(errorData, "Error al generar el PDF de la cotización"),
    );
  }

  return response.blob();
};
