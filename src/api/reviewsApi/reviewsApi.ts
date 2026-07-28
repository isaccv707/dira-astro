import { apiGet } from "../apiGet";
import { API_URL } from "../../constants/apiUrl";
import type { ReviewResponse, ReviewPayload, ReviewPaginatedResponse } from "./review.interface";
import { resolveBranchId } from "../../stores/branchStore";
import { createTtlCache } from "../../utils/ttlCache";

const reviewsCache = createTtlCache<ReviewPaginatedResponse>();

export const getAllReviews = async (branchId?: string): Promise<ReviewPaginatedResponse> => {
  const resolvedBranchId = branchId ?? resolveBranchId();
  const emptyResponse: ReviewPaginatedResponse = {
    data: [],
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  };
  const cacheKey = resolvedBranchId ?? "__no_branch__";

  const cached = reviewsCache.get(cacheKey);
  if (cached) return cached;

  try {
    const data = await apiGet<ReviewPaginatedResponse>("/reviews/approved", {
      branchId: resolvedBranchId,
    });
    const result = data ?? emptyResponse;
    reviewsCache.set(cacheKey, result);
    return result;
  } catch (error) {
    const stale = reviewsCache.getStale(cacheKey);
    if (stale) {
      console.error("Error fetching reviews, serving stale cache:", error);
      return stale;
    }
    throw error;
  }
};

export const createReview = async (
  newReview: ReviewPayload,
): Promise<ReviewResponse> => {
  const response = await fetch(`${API_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newReview),
  });
  if (!response.ok) {
    throw new Error(`Error al crear la review: ${response.statusText}`);
  }
  return response.json();
};
