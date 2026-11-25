/** Mexico country code: wa.me and tel: need the full international number. */
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
 * `tel:` link in E.164 (`tel:+523337223456`): the backend stores branch phones
 * as typed ("33 3722 3456"), and spaces or a missing country code break the
 * dialer on some devices.
 */
export const buildTelUrl = (phone: string): string => {
  const number = toWhatsappNumber(phone);
  return number.startsWith(MX_COUNTRY_CODE) && number.length === 12
    ? `tel:+${number}`
    : `tel:${number}`;
};

/**
 * Display format for MX phones ("33 3722 3456"); the backend stores them as
 * typed, so branches showed mixed formats. Non-10-digit values are returned
 * as typed.
 */
export const formatPhone = (phone: string): string => {
  const digits = phone.replace(/\D/g, "");
  const national =
    digits.length === 12 && digits.startsWith(MX_COUNTRY_CODE) ? digits.slice(2) : digits;
  return national.length === 10
    ? `${national.slice(0, 2)} ${national.slice(2, 6)} ${national.slice(6)}`
    : phone.trim();
};

/** International display format for structured data ("+52 33 3722 3456"). */
export const formatInternationalPhone = (phone: string): string => {
  const display = formatPhone(phone);
  return /^\d{2} \d{4} \d{4}$/.test(display) ? `+${MX_COUNTRY_CODE} ${display}` : display;
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
