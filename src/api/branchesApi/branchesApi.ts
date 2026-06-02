import { API_URL } from "../../constants/apiUrl";
import type { Branch } from "../../interfaces/branch.interface";

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

export const getOneBranch = async (id: string): Promise<Branch> => {
  const response = await fetch(`${API_URL}/branches/${id}`, {
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
