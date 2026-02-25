import type { PostResponse } from "../api/postApi/postApi";
import { API_URL } from "../constants/apiUrl";

export const fetchPosts = async (
    page: number = 1,
    limit: number = 10,
    category?: string,
): Promise<PostResponse | null> => {
    const url = new URL(`${API_URL}/posts`);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('limit', limit.toString());
    
    if (category) {
        url.searchParams.append('category', category);
    }

    try {
        const response = await fetch(url.toString());
        if (!response.ok) {
            throw new Error(`Error fetching posts: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        return { data: [], meta: { total: 0, page: 1, lastPage: 1 } };
    }
}