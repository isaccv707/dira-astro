import { api } from "../api";
import type { Post } from "../interfaces/post.interface";


export interface PostResponse {
    data: Post[];
    meta: {
        total: number;
        page: number;
        lastPage: number;
        limit: number;
        totalPages: number;
    };
}

export const postApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllPosts: builder.query<PostResponse, { page?: number; limit?: number; search?: string }>({
            query: (params) => ({
                url: 'posts',
                method: 'GET',
                params,
            })
        })
    })
});

export const { useGetAllPostsQuery } = postApi;