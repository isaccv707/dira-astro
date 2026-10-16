// Public origin used for canonical, Open Graph and sitemap URLs. Never derive
// these from Astro.url: behind the production proxy it resolves to localhost.
export const SITE_URL = (
  import.meta.env.PUBLIC_SITE_URL || "https://dyranalitica.com"
).replace(/\/+$/, "");

export const SITE_NAME = "Laboratorio DYRA";
export const SITE_LEGAL_NAME = "Diagnóstico y Referencia Analítica";
export const SITE_LOCALE = "es_MX";
export const SITE_LANG = "es-MX";

// Branch used when the visitor (or a crawler) has no branch cookie yet:
// DYRA Guadalajara. Keeps branch-scoped pages renderable and indexable.
export const DEFAULT_BRANCH_ID =
  import.meta.env.PUBLIC_DEFAULT_BRANCH_ID ||
  "a66b4b2b-dfed-41ef-a607-5c81aea7f777";

export const DEFAULT_OG_IMAGE = "/og-default.jpg";
export const DEFAULT_OG_IMAGE_ALT =
  "Laboratorio DYRA: tu salud en manos de expertos";

export const FACEBOOK_URL =
  "https://www.facebook.com/people/Diagn%C3%B3stico-y-Referencia-Analitica/61571122002782/";

export const absoluteUrl = (path: string) => new URL(path, `${SITE_URL}/`).toString();
