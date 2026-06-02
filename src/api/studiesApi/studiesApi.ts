import { API_URL } from "../../constants/apiUrl";
import type { Study } from "../../interfaces/study.interface";
import { api } from "../api";
import type {
  GetAllStudiesParams,
  GetAllStudiesResponse,
} from "../interfaces/study.interface";

export const studiesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudies: builder.query<GetAllStudiesResponse, GetAllStudiesParams>({
      query: ({ page = 1, limit = 10, search } = {}) => ({
        url: "studies",
        method: "GET",
        params: { page, limit, ...(search ? { search } : {}) },
      }),
    }),
  }),
});

export const { useGetAllStudiesQuery } = studiesApi;

// import { API_URL } from "../../constants/apiUrl";
// import type {
//   GetAllStudiesParams,
//   GetAllStudiesResponse,
// } from "../interfaces/study.interface";

// export const getAllStudies = async ({
//   page = 1,
//   limit = 10,
//   search,
// }: GetAllStudiesParams = {}): Promise<GetAllStudiesResponse> => {
//   // 1. Inicializamos los parámetros base
//   const queryParams = new URLSearchParams({
//     page: page.toString(),
//     limit: limit.toString(),
//   });

//   if (search) {
//     queryParams.append("search", search);
//   }

//   const url = `${API_URL}?${queryParams.toString()}`;

//   const response = await fetch(url, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (!response.ok) {
//     throw new Error(
//       `Error en la petición: ${response.status} ${response.statusText}`,
//     );
//   }

//   return response.json();
// };
