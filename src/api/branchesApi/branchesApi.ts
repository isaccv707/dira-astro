import { apiGet } from "../apiGet";
import type { Branch } from "../../interfaces/branch.interface";

export const getAllBranches = async (): Promise<Branch[]> => {
  const data = await apiGet<Branch[]>("/branches");
  return data ?? [];
};

export const getOneBranch = async (id: string): Promise<Branch | null> => {
  return apiGet<Branch>(`/branches/${id}`);
};
