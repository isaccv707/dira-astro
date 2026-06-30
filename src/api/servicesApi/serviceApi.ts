import { API_URL } from "../../constants/apiUrl";
import type { Service } from "../../interfaces/service.interface";

export const getAllService = async (branchId?: string): Promise<Service[]> => {
  try {
    const url = new URL(`${API_URL}/services`);
    if (branchId) url.searchParams.set("branchId", branchId);
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(
        `Error en la petición: ${response.status} ${response.statusText}`,
      );
    }

    const data: Service[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los servicios con fetch:", error);
    return [];
  }
};
