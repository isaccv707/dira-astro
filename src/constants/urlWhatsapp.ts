import { normalizeWhatsappUrl } from "../utils/whatsapp";

export const urlWhatsapp = normalizeWhatsappUrl(import.meta.env.PUBLIC_URL_WHATSAPP) ?? "";
