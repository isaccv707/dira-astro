import type { Study } from "../../interfaces/study.interface";
import { api } from "../api";

type GetAllStudiesParams = {
    page?: number;
    limit?: number;
    search?: string;
}

interface GetAllStudiesResponse {
    items: Study[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    }
}

export const studiesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllStudies: builder.query<GetAllStudiesResponse, GetAllStudiesParams>({
            query: ({ page = 1, limit = 10, search } = {}) => ({
                url: '/studies',
                method: 'GET',
                params: { page, limit, ...(search ? { search } : {}) }
            })
        })
    })
})

export const { useGetAllStudiesQuery } = studiesApi;