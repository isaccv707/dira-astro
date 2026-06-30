import type { Banner } from "../../interfaces/banner.interface";

const API_URL = import.meta.env.PUBLIC_API_URL;

export const fetchActiveBanners = async (
  placement: string,
  branchId?: string,
): Promise<Banner[]> => {
  try {
    const url = new URL(`${API_URL}/banners/active/${placement}`);
    if (branchId) url.searchParams.set("branchId", branchId);
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Error retrieving banners: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en fetchActiveBanners:", error);
    return [];
  }
};
