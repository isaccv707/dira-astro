import { buildWhatsappUrl, normalizeWhatsappUrl } from "../utils/whatsapp";

export const urlWhatsapp = normalizeWhatsappUrl(import.meta.env.PUBLIC_URL_WHATSAPP) ?? "";

/**
 * WhatsApp link for the active branch: its own number from the database, or
 * the site-wide fallback (PUBLIC_URL_WHATSAPP) when the branch has none.
 * The prefilled message is kept in both cases. "" when neither exists.
 */
export const branchWhatsappUrl = (
  phone?: string | null,
  message?: string,
): string => {
  if (phone?.trim()) return buildWhatsappUrl(phone, message);
  if (!urlWhatsapp) return "";
  if (!message) return urlWhatsapp;
  const separator = urlWhatsapp.includes("?") ? "&" : "?";
  return `${urlWhatsapp}${separator}text=${encodeURIComponent(message)}`;
};
