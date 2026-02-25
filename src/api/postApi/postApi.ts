import { api } from "../api";
import type { Post } from "../interfaces/post.interface";


export interface PostResponse {
    data: Post[]; 
    meta: {
        total: number;
        page: number;
        lastPage: number;
    };
}

export const postApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query<PostResponse, { page?: number; limit?: number; category?: string }>({
            query: (params) => ({
                url: '/posts',
                method: 'GET',
                params,
            })
        })
    })
});

export const { useGetPostsQuery } = postApi;