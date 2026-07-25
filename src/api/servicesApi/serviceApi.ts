import { apiGet } from "../apiGet";
import type { Service } from "../../interfaces/service.interface";

interface GetAllServicesResponse {
  data: Service[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const getAllService = async (branchId?: string): Promise<Service[]> => {
  const response = await apiGet<GetAllServicesResponse>("/services", { branchId });
  return response?.data ?? [];
};
