/** Google Ads account and conversion actions (public IDs, not secrets). */
export const GOOGLE_ADS_ID = "AW-17974653170";
export const ADS_CONVERSIONS = {
  whatsapp: `${GOOGLE_ADS_ID}/3PhiCK_kx7gdEPLh_fpC`,
  call: `${GOOGLE_ADS_ID}/5TblCLLkx7gdEPLh_fpC`,
} as const;

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

export const trackConversion = (kind: keyof typeof ADS_CONVERSIONS): void => {
  if (typeof window === "undefined") return;
  (window as GtagWindow).gtag?.("event", "conversion", {
    send_to: ADS_CONVERSIONS[kind],
  });
};
