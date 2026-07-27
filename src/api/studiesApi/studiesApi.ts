import { apiGet } from "../apiGet";
import type {
  GetAllStudiesParams,
  GetAllStudiesResponse,
} from "./study.interface";
import { resolveBranchId } from "../../stores/branchStore";
import { createTtlCache } from "../../utils/ttlCache";

const studiesCache = createTtlCache<GetAllStudiesResponse>();

export const getAllStudies = async ({
  page = 1,
  limit = 10,
  search,
  branchId,
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
    branchId: resolvedBranchId,
  });

  const cached = studiesCache.get(cacheKey);
  if (cached) return cached;

  try {
    const data = await apiGet<GetAllStudiesResponse>("/studies", {
      page,
      limit,
      search,
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
