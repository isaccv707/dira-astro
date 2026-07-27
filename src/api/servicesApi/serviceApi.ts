import { apiGet } from "../apiGet";
import type { Service } from "../../interfaces/service.interface";
import type { Routes } from "../../routes/routes";
import { resolveBranchId } from "../../stores/branchStore";
import { createTtlCache } from "../../utils/ttlCache";

interface GetAllServicesResponse {
  data: Service[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const servicesCache = createTtlCache<Service[]>();

export const getAllService = async (branchId?: string): Promise<Service[]> => {
  const resolvedBranchId = branchId ?? resolveBranchId();
  const cacheKey = resolvedBranchId ?? "__no_branch__";

  const cached = servicesCache.get(cacheKey);
  if (cached) return cached;

  try {
    const response = await apiGet<GetAllServicesResponse>("/services", {
      branchId: resolvedBranchId,
    });
    const data = response?.data ?? [];
    servicesCache.set(cacheKey, data);
    return data;
  } catch (error) {
    const stale = servicesCache.getStale(cacheKey);
    if (stale) {
      console.error("Error fetching services, serving stale cache:", error);
      return stale;
    }
    throw error;
  }
};

const navRoutesCache = createTtlCache<Routes[]>();

const toNavRoutes = (services: Service[]): Routes[] =>
  services.map(({ slug, name }) => ({ path: `/service/${slug}`, text: name }));

export const getServicesNavRoutes = async (branchId?: string): Promise<Routes[]> => {
  const resolvedBranchId = branchId ?? resolveBranchId();
  const cacheKey = resolvedBranchId ?? "__no_branch__";

  const cached = navRoutesCache.get(cacheKey);
  if (cached) return cached;

  try {
    const services = await getAllService(resolvedBranchId);
    const data = toNavRoutes(services);
    navRoutesCache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error("Error fetching services for nav:", error);
    return navRoutesCache.getStale(cacheKey) ?? [];
  }
};
