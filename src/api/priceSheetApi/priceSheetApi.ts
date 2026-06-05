import { API_URL } from "../../constants/apiUrl";
import type { PriceSheetResponse } from "./priceSheet-interface";

export const getPriceSheet = async (
  id: string,
  page: number = 1,
  limit: number = 1,
  search?: string,
): Promise<PriceSheetResponse | null> => {
  try {
    const url = new URL(`${API_URL}/price-sheets/${id}`);
    url.searchParams.append("page", page.toString());
    url.searchParams.append("limit", limit.toString());
    if (search) {
      url.searchParams.append("search", search);
    }

    const response = await fetch(url.toString(), {
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

    const data: PriceSheetResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener la hoja de precios con fetch:", error);
    return null;
  }
};
