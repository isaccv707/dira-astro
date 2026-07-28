import { apiGet } from "../apiGet";
import type { PostResponse } from "./post.interface";
import { resolveBranchId } from "../../stores/branchStore";
import { createTtlCache } from "../../utils/ttlCache";

interface FetchPostsParams {
  page?: number;
  limit?: number;
  search?: string;
  branchId?: string;
}

const postsCache = createTtlCache<PostResponse>();

const emptyPostsResponse = (limit?: number): PostResponse => ({
  data: [],
  meta: { total: 0, page: 1, lastPage: 1, limit: limit ?? 10, totalPages: 1 },
});

export const fetchGetAllPosts = async ({
  page,
  limit,
  search,
  branchId,
}: FetchPostsParams = {}): Promise<PostResponse> => {
  const resolvedBranchId = branchId ?? resolveBranchId();
  const cacheKey = JSON.stringify({
    page,
    limit,
    search,
    branchId: resolvedBranchId,
  });

  const cached = postsCache.get(cacheKey);
  if (cached) return cached;

  try {
    const data = await apiGet<PostResponse>("/posts", {
      page,
      limit,
      search,
      branchId: resolvedBranchId,
      status: "PUBLISHED",
    });
    const result = data ?? emptyPostsResponse(limit);
    postsCache.set(cacheKey, result);
    return result;
  } catch (error) {
    const stale = postsCache.getStale(cacheKey);
    if (stale) {
      console.error("Error fetching posts, serving stale cache:", error);
      return stale;
    }
    throw error;
  }
};
