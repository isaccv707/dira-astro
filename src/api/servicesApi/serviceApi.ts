
import type { Service } from "../../interfaces/service.interface";
import type { Study } from "../../interfaces/study.interface";
import { api } from "../api";

type GetAllServicesResponse = Service[]


export const serviceApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllServices: builder.query<GetAllServicesResponse, void>({
            query: () => ({
                url: "services"
            }),
        })
    })
})

export const { useGetAllServicesQuery, useLazyGetAllServicesQuery } = serviceApi;