/** Mexico country code: wa.me rejects national 10-digit numbers. */
const MX_COUNTRY_CODE = "52";

/** Digits only, prefixed with 52 when the number is a bare 10-digit MX number. */
export const toWhatsappNumber = (phone: string): string => {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 ? `${MX_COUNTRY_CODE}${digits}` : digits;
};

export const buildWhatsappUrl = (phone: string, message?: string): string => {
  const base = `https://wa.me/${toWhatsappNumber(phone)}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

/**
 * Rebuilds a configured WhatsApp link (wa.me/<n> or api.whatsapp.com/send?phone=<n>)
 * as wa.me with the country code. Unknown formats are returned unchanged.
 */
export const normalizeWhatsappUrl = (url: string | undefined): string | undefined => {
  if (!url) return url;
  try {
    const parsed = new URL(url);
    const phone =
      parsed.searchParams.get("phone") ??
      (parsed.hostname === "wa.me" ? parsed.pathname.slice(1) : null);
    return phone ? buildWhatsappUrl(phone) : url;
  } catch {
    return url;
  }
};
