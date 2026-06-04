import { API_URL } from "../../constants/apiUrl";
import type { PostResponse } from "./post.interface";

interface FetchPostsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const fetchGetAllPosts = async ({
  page,
  limit,
  search,
}: FetchPostsParams = {}): Promise<PostResponse[]> => {
  // 1. Construimos la URL base para los posts
  const url = new URL(`${API_URL}/posts`);

  if (page) url.searchParams.append("page", page.toString());
  if (limit) url.searchParams.append("limit", limit.toString());
  if (search) url.searchParams.append("search", search);

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || "Error al obtener las publicaciones",
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error en fetchGetAllPosts:", error);
    throw error;
  }
};
