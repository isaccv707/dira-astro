import { apiGet } from "../apiGet";
import type { PostResponse } from "./post.interface";

interface FetchPostsParams {
  page?: number;
  limit?: number;
  search?: string;
  branchId?: string;
}

export const fetchGetAllPosts = async ({
  page,
  limit,
  search,
  branchId,
}: FetchPostsParams = {}): Promise<PostResponse> => {
  const data = await apiGet<PostResponse>("/posts", {
    page,
    limit,
    search,
    branchId,
    status: "PUBLISHED",
  });
  return data ?? { data: [], meta: { total: 0, page: 1, lastPage: 1, limit: limit ?? 10, totalPages: 1 } };
};
