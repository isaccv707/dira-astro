/** Google Ads account and conversion actions (public IDs, not secrets). */
export const GOOGLE_ADS_ID = "AW-17974653170";
export const ADS_CONVERSIONS = {
  whatsapp: `${GOOGLE_ADS_ID}/3PhiCK_kx7gdEPLh_fpC`,
  call: `${GOOGLE_ADS_ID}/5TblCLLkx7gdEPLh_fpC`,
} as const;

/**
 * Google's standard gtag.js bootstrap, emitted as a plain global script (no
 * IIFE) so `dataLayer`/`gtag` are exactly what Tag Assistant expects.
 */
export const GTAG_BOOTSTRAP = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}');
`;

/**
 * Site-wide conversion listener: every WhatsApp (wa.me / api.whatsapp.com)
 * and tel: link, including ones rendered later by React islands. Capture
 * phase so a component calling stopPropagation() cannot swallow it.
 * Clicks that open WhatsApp without a link (window.open) call
 * trackConversion() themselves.
 */
export const GTAG_CLICK_CONVERSIONS = `
(function () {
  function trackLink(e) {
    // auxclick: middle click ("open in new tab") still reaches WhatsApp.
    if (e.type === 'auxclick' && e.button !== 1) return;
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a || typeof gtag !== 'function') return;
    var href = (a.getAttribute('href') || '').trim().toLowerCase();
    if (href.indexOf('wa.me') > -1 || href.indexOf('api.whatsapp.com') > -1) {
      gtag('event', 'conversion', {'send_to': '${ADS_CONVERSIONS.whatsapp}'});
    } else if (href.indexOf('tel:') === 0) {
      gtag('event', 'conversion', {'send_to': '${ADS_CONVERSIONS.call}'});
    }
  }
  document.addEventListener('click', trackLink, true);
  document.addEventListener('auxclick', trackLink, true);
})();
`;

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

export const trackConversion = (kind: keyof typeof ADS_CONVERSIONS): void => {
  if (typeof window === "undefined") return;
  (window as GtagWindow).gtag?.("event", "conversion", {
    send_to: ADS_CONVERSIONS[kind],
  });
};
