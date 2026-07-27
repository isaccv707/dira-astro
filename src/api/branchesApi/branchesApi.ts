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

const activeBranchCache = createTtlCache<Branch | null>();

const getActiveBranch = async (branchId?: string): Promise<Branch | null> => {
  const resolvedBranchId = branchId ?? resolveBranchId();
  if (!resolvedBranchId) return null;

  const cached = activeBranchCache.get(resolvedBranchId);
  if (cached !== undefined) return cached;

  try {
    const branch = await getOneBranch(resolvedBranchId);
    activeBranchCache.set(resolvedBranchId, branch);
    return branch;
  } catch (error) {
    console.error("Error fetching active branch:", error);
    return activeBranchCache.getStale(resolvedBranchId) ?? null;
  }
};

export const getActiveBranchResultsUrl = async (
  branchId?: string,
): Promise<string | null> => {
  const branch = await getActiveBranch(branchId);
  return branch?.urlResults ?? null;
};

export interface ActiveBranchContact {
  phone: string;
  email: string;
}

export const getActiveBranchContact = async (
  branchId?: string,
): Promise<ActiveBranchContact | null> => {
  const branch = await getActiveBranch(branchId);
  if (!branch) return null;
  return { phone: branch.phone, email: branch.email };
};
