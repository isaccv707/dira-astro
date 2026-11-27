import { apiGet } from "../apiGet";
import type {
  GetAllStudiesParams,
  GetAllStudiesResponse,
} from "./study.interface";
import { resolveBranchId } from "../../stores/branchStore";
import { createTtlCache } from "../../utils/ttlCache";
import type { PanelTree, Study } from "../../interfaces/study.interface";

const studiesCache = createTtlCache<GetAllStudiesResponse>();

export const getAllStudies = async ({
  page = 1,
  limit = 10,
  search,
  branchId,
  isPanel,
}: GetAllStudiesParams = {}): Promise<GetAllStudiesResponse> => {
  const resolvedBranchId = branchId ?? resolveBranchId();
  const emptyResponse: GetAllStudiesResponse = {
    data: [],
    total: 0,
    page,
    limit,
    totalPages: 1,
  };
  const cacheKey = JSON.stringify({
    page,
    limit,
    search,
    isPanel,
    branchId: resolvedBranchId,
  });

  const cached = studiesCache.get(cacheKey);
  if (cached) return cached;

  try {
    const data = await apiGet<GetAllStudiesResponse>("/studies", {
      page,
      limit,
      search,
      isPanel,
      branchId: resolvedBranchId,
    });
    const result = data ?? emptyResponse;
    studiesCache.set(cacheKey, result);
    return result;
  } catch (error) {
    const stale = studiesCache.getStale(cacheKey);
    if (stale) {
      console.error("Error fetching studies, serving stale cache:", error);
      return stale;
    }
    throw error;
  }
};

const featuredCache = createTtlCache<Study[]>();

/**
 * Studies the branch highlights in "Más solicitados" (set in the admin),
 * already sorted. Only priced ones are returned, since the section sells
 * by price. Failures degrade to [] (or stale) so the home page still renders.
 */
export const getFeaturedStudies = async (
  branchId?: string,
  limit = 8,
): Promise<Study[]> => {
  const resolvedBranchId = branchId ?? resolveBranchId();
  if (!resolvedBranchId) return [];
  const cacheKey = `${resolvedBranchId}:${limit}`;

  const cached = featuredCache.get(cacheKey);
  if (cached) return cached;

  try {
    const data = await apiGet<GetAllStudiesResponse>("/studies", {
      featured: "true",
      limit,
      branchId: resolvedBranchId,
    });
    const result = (data?.data ?? []).filter((study) => study.priceInfo?.showPrice);
    featuredCache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.error("Error fetching featured studies:", error);
    return featuredCache.getStale(cacheKey) ?? [];
  }
};

// Panel structure rarely changes, so keep it for the whole tab session.
// In-flight promises are shared so cards rendering the same panel only
// fire one request. Failures are not cached so "Reintentar" hits the API.
const PANEL_TREE_TTL_MS = 30 * 60 * 1000;
const panelTreeCache = createTtlCache<PanelTree | null>(PANEL_TREE_TTL_MS);
const panelTreeInFlight = new Map<string, Promise<PanelTree | null>>();

export const getCachedPanelTree = (id: string): PanelTree | null | undefined =>
  panelTreeCache.get(id);

// Resolves null on 404 — the panel is no longer active.
export const getPanelTree = (id: string): Promise<PanelTree | null> => {
  const cached = panelTreeCache.get(id);
  if (cached !== undefined) return Promise.resolve(cached);

  const pending = panelTreeInFlight.get(id);
  if (pending) return pending;

  const request = apiGet<PanelTree>(`/studies/${id}/panel-tree`)
    .then((tree) => {
      panelTreeCache.set(id, tree);
      return tree;
    })
    .finally(() => panelTreeInFlight.delete(id));

  panelTreeInFlight.set(id, request);
  return request;
};
