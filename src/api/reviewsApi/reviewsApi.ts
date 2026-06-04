import { API_URL } from "../../constants/apiUrl";

import type { ReviewResponse, ReviewPayload } from "./review.interface";

export const getAllReviews = async (): Promise<ReviewResponse[]> => {
  const response = await fetch(`${API_URL}/reviews/approved`, {
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
): Promise<ReviewResponse[]> => {
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
