import { apiGet } from "../apiGet";
import type { Banner } from "../../interfaces/banner.interface";
import { resolveBranchId } from "../../stores/branchStore";
import { createTtlCache } from "../../utils/ttlCache";

const bannersCache = createTtlCache<Banner[]>();

export const fetchActiveBanners = async (
  placement: string,
  branchId?: string,
): Promise<Banner[]> => {
  const resolvedBranchId = branchId ?? resolveBranchId();
  const cacheKey = `${placement}:${resolvedBranchId ?? "__no_branch__"}`;

  const cached = bannersCache.get(cacheKey);
  if (cached) return cached;

  try {
    const data = await apiGet<Banner[]>(`/banners/active/${placement}`, {
      branchId: resolvedBranchId,
    });
    const result = data ?? [];
    bannersCache.set(cacheKey, result);
    return result;
  } catch (error) {
    const stale = bannersCache.getStale(cacheKey);
    if (stale) {
      console.error("Error fetching banners, serving stale cache:", error);
      return stale;
    }
    throw error;
  }
};
