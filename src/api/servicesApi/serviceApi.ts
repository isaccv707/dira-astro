import { apiGet } from "../apiGet";
import type { Service } from "../../interfaces/service.interface";

export const getAllService = async (branchId?: string): Promise<Service[]> => {
  const data = await apiGet<Service[]>("/services", { branchId });
  return data ?? [];
};
