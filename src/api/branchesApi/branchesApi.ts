import { apiGet } from "../apiGet";
import type { Branch } from "../../interfaces/branch.interface";
import { resolveBranchId } from "../../stores/branchStore";
import { createTtlCache } from "../../utils/ttlCache";

const branchesCache = createTtlCache<Branch[]>();

export const getAllBranches = async (): Promise<Branch[]> => {
  const cacheKey = "__all__";
  const cached = branchesCache.get(cacheKey);
  if (cached) return cached;

  try {
    const data = await apiGet<Branch[]>("/branches");
    const result = data ?? [];
    branchesCache.set(cacheKey, result);
    return result;
  } catch (error) {
    const stale = branchesCache.getStale(cacheKey);
    if (stale) {
      console.error("Error fetching branches, serving stale cache:", error);
      return stale;
    }
    throw error;
  }
};

export const getOneBranch = async (id: string): Promise<Branch | null> => {
  return apiGet<Branch>(`/branches/${id}`);
};

const resultsUrlCache = createTtlCache<string | null>();

export const getActiveBranchResultsUrl = async (
  branchId?: string,
): Promise<string | null> => {
  const resolvedBranchId = branchId ?? resolveBranchId();
  if (!resolvedBranchId) return null;

  const cached = resultsUrlCache.get(resolvedBranchId);
  if (cached !== undefined) return cached;

  try {
    const branch = await getOneBranch(resolvedBranchId);
    const url = branch?.urlResults ?? null;
    resultsUrlCache.set(resolvedBranchId, url);
    return url;
  } catch (error) {
    console.error("Error fetching active branch results url:", error);
    return resultsUrlCache.getStale(resolvedBranchId) ?? null;
  }
};
