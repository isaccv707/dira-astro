import { useState, useEffect } from "react";
import type {
  Post,
  PostResponse,
} from "../api/postsApi/post.interface";
import { fetchGetAllPosts } from "../api/postsApi/postApi";
// Importamos tu función fetch recién creada

interface useGetAllPostsParams {
  page?: number;
  limit?: number;
  search?: string;
  branchId?: string;
}

export const useGetAllPosts = ({
  limit = 10,
  page = 1,
  search,
  branchId,
}: useGetAllPostsParams) => {
  // 1. Estados locales para suplir lo que hacía RTK Query
  const [posts, setPosts] = useState<Post[]>([]);
  const [meta, setMeta] = useState<PostResponse["meta"] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 2. Efecto reactivo que escucha cambios en los parámetros
  useEffect(() => {
    const getPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetchGetAllPosts({ page, limit, search, branchId });
        setPosts(response.data);
        setMeta(response.meta);
      } catch (err) {
        console.error("Error en useGetAllPosts hook:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Error inesperado al cargar posts",
        );
      } finally {
        setIsLoading(false);
      }
    };

    getPosts();
  }, [page, limit, search, branchId]);

  return {
    posts,
    meta,
    totalPosts: meta?.total,
    totalPages: meta?.totalPages ?? 1,
    isLoading,
    error,
  };
};
