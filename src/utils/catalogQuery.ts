import {
  STUDY_TYPE_QUERY_KEY,
  parseStudyTypeFilter,
  studyTypeToQueryValue,
  type StudyTypeFilter,
} from "./studyTypeFilter";

// Catalog state lives in the URL (?q=&tipo=&pagina=) so every view is
// shareable, survives reloads and is rendered by the server on first load.
export const SEARCH_QUERY_KEY = "q";
export const PAGE_QUERY_KEY = "pagina";
export const CATALOG_ANCHOR = "catalogo";

export interface CatalogQuery {
  search: string;
  page: number;
  studyType: StudyTypeFilter;
}

export const parseCatalogQuery = (params: URLSearchParams): CatalogQuery => {
  const page = Number.parseInt(params.get(PAGE_QUERY_KEY) ?? "", 10);
  return {
    search: (params.get(SEARCH_QUERY_KEY) ?? "").trim().slice(0, 100),
    page: Number.isFinite(page) && page > 0 ? page : 1,
    studyType: parseStudyTypeFilter(params.get(STUDY_TYPE_QUERY_KEY)),
  };
};

export const buildCatalogHref = (
  basePath: string,
  { search, page, studyType }: CatalogQuery,
  withAnchor = true,
): string => {
  const params = new URLSearchParams();
  if (search) params.set(SEARCH_QUERY_KEY, search);
  const type = studyTypeToQueryValue(studyType);
  if (type) params.set(STUDY_TYPE_QUERY_KEY, type);
  if (page > 1) params.set(PAGE_QUERY_KEY, String(page));
  const query = params.toString();
  return `${basePath}${query ? `?${query}` : ""}${withAnchor ? `#${CATALOG_ANCHOR}` : ""}`;
};
