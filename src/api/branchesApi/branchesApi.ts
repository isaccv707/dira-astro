import type { Branch } from "../../interfaces/branch.interface";
import { api } from "../api";

export const branchesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllBranches: builder.query<Branch[], void>({
            query: () => ({
                url: 'branches',
                method: 'GET'
            }),
            providesTags: ["Branches"]
        })
    })
})

export const { useGetAllBranchesQuery, useLazyGetAllBranchesQuery } = branchesApi;