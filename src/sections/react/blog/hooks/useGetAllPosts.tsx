import { useGetAllPostsQuery } from "../../../../api/postsApi/postApi";


interface useGetAllPostsParams {
    page?: number;
    limit?: number;
    search?: string;
}

export const useGetAllPosts = ({ limit = 10, page = 1, search }: useGetAllPostsParams) => {
    
    const { data } = useGetAllPostsQuery({ page, limit, search })
    const posts = data?.data ?? [];
    const meta = data?.meta;

    const totalPosts = meta?.total;

    return {
        posts,
        meta,
        totalPosts,
        totalPages: meta?.totalPages ?? 1,
    }
}