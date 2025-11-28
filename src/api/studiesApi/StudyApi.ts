import type { Study } from "../../interfaces/study.interface";
import { api } from "../api";

export const studiesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllStudies: builder.query<Study[], void>({
            query: () => ({
                url: 'studies',
                method: 'GET',
            })
        })
    })
})

export const { useGetAllStudiesQuery } = studiesApi;