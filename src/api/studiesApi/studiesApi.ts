import type { Study } from "../../interfaces/study.interface";
import { api } from "../api";
import type { GetAllStudiesParams, GetAllStudiesResponse } from "../interfaces/study.interface";



export const studiesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllStudies: builder.query<GetAllStudiesResponse, GetAllStudiesParams>({
            query: ({ page = 1, limit = 10, search } = {}) => ({
                url: 'studies',
                method: 'GET',
                params: { page, limit, ...(search ? { search } : {}) }
            })
        })
    })
})

export const { useGetAllStudiesQuery } = studiesApi;