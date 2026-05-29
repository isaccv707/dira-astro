import { API_URL } from "../../constants/apiUrl";
import type { Branch } from "../../interfaces/branch.interface";
import { api } from "../api";

export const branchesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBranches: builder.query<Branch[], void>({
      query: () => ({
        url: "branches",
        method: "GET",
      }),
      providesTags: ["Branches"],
    }),
  }),
});

export const { useGetAllBranchesQuery, useLazyGetAllBranchesQuery } =
  branchesApi;

export const getAllBranches = async (): Promise<Branch[]> => {
  const response = await fetch(`${API_URL}/branches`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Error al obtener las sucursales: ${response.statusText}`);
  }

  return response.json();
};
