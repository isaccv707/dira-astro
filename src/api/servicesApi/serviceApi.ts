import { API_URL } from "../../constants/apiUrl";
import type { Service } from "../../interfaces/service.interface";

export const getAllService = async (): Promise<Service[]> => {
  try {
    const response = await fetch(`${API_URL}/services`, {
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
