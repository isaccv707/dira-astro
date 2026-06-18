import { API_URL } from "../../constants/apiUrl";
import type {
  GetAllStudiesParams,
  GetAllStudiesResponse,
} from "./study.interface";

export const getAllStudies = async ({
  page = 1,
  limit = 10,
  search,
}: GetAllStudiesParams = {}): Promise<GetAllStudiesResponse> => {
  // 1. Inicializamos los parámetros base
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (search) {
    queryParams.append("search", search);
  }

  const url = `${API_URL}/studies?${queryParams.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Error en la petición: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
};
