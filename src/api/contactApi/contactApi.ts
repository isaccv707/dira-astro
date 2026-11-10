import { API_URL } from "../../constants/apiUrl";
import type { components } from "../generated/openapi";

export type ContactMessagePayload = components["schemas"]["CreateContactMessageDto"];
export type ContactSubject = ContactMessagePayload["subject"];
export type ContactMessageReceived = components["schemas"]["ContactMessageReceivedDto"];

/** POST /contact-messages (public). Throws Error(message) with the backend's Spanish text. */
export const sendContactMessage = async (
  payload: ContactMessagePayload,
): Promise<ContactMessageReceived> => {
  const response = await fetch(`${API_URL}/contact-messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("Enviaste varios mensajes en poco tiempo. Intenta de nuevo en unos minutos.");
    }
    const body = (await response.json().catch(() => null)) as { message?: string | string[] } | null;
    const message = Array.isArray(body?.message) ? body.message[0] : body?.message;
    throw new Error(message || "No pudimos enviar tu mensaje.");
  }
  return response.json();
};
