import { API_URL } from "../../constants/apiUrl";

import type { ReviewResponse, ReviewPayload, ReviewPaginatedResponse } from "./review.interface";

export const getAllReviews = async (branchId?: string): Promise<ReviewPaginatedResponse> => {
  const url = new URL(`${API_URL}/reviews/approved`);
  if (branchId) url.searchParams.set("branchId", branchId);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Error al obtener las reviews: ${response.statusText}`);
  }
  return response.json();
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
