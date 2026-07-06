import { apiGet } from "../apiGet";
import type { Banner } from "../../interfaces/banner.interface";

export const fetchActiveBanners = async (
  placement: string,
  branchId?: string,
): Promise<Banner[]> => {
  const data = await apiGet<Banner[]>(`/banners/active/${placement}`, { branchId });
  return data ?? [];
};
