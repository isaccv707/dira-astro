/** Google Ads account and conversion actions (public IDs, not secrets). */
export const GOOGLE_ADS_ID = "AW-17974653170";
/** Google Tag Manager container (public ID). Loaded next to gtag.js; both share dataLayer. */
export const GTM_ID = "GTM-M4JDX6KF";
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
 * Only real links count: the cart's "schedule by WhatsApp" (window.open) is
 * deliberately not tracked as an Ads conversion.
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
