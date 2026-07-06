import { apiGet } from "../apiGet";
import { API_URL } from "../../constants/apiUrl";
import type { ReviewResponse, ReviewPayload, ReviewPaginatedResponse } from "./review.interface";

export const getAllReviews = async (branchId?: string): Promise<ReviewPaginatedResponse> => {
  const data = await apiGet<ReviewPaginatedResponse>("/reviews/approved", { branchId });
  return data ?? { data: [], total: 0, page: 1, limit: 10, totalPages: 1 };
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
