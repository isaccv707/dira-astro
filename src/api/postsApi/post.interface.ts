import type { Post } from "../../interfaces/blog.interface";

export interface PostMeta {
  total: number;
  page: number;
  lastPage: number;
  limit: number;
  totalPages: number;
}

// Esta es la interfaz principal que consume tu fetchGetAllPosts
export interface PostResponse {
  data: Post[];
  meta: PostMeta;
}
