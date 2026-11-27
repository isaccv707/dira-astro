/**
 * Direct routes from the home page to what patients search for most in
 * Mexico (monthly search volume, Nov 2026). Each one opens the catalog
 * already filtered, so the visitor lands on prices in one tap.
 *
 * `query` is what the catalog search receives. The backend matches it as a
 * case-insensitive (but accent-sensitive) substring of name/title/code, so
 * use a short stem without accented letters ("sangu", not "química").
 */
export interface PopularSearch {
  label: string;
  query: string;
}

export const POPULAR_SEARCHES: PopularSearch[] = [
  { label: "Prueba de embarazo en sangre", query: "embarazo" },
  { label: "Antidoping", query: "antidoping" },
  { label: "Espermabioscopia", query: "esperma" },
  { label: "Perfil tiroideo", query: "tiroid" },
  { label: "Química sanguínea", query: "sangu" },
  { label: "Biometría hemática", query: "biometr" },
  { label: "Prueba de paternidad", query: "paternidad" },
];

export const popularSearchHref = ({ query }: PopularSearch) =>
  `/estudios?q=${encodeURIComponent(query)}#catalogo`;
