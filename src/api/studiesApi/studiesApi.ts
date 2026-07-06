import { apiGet } from "../apiGet";
import type {
  GetAllStudiesParams,
  GetAllStudiesResponse,
} from "./study.interface";

export const getAllStudies = async ({
  page = 1,
  limit = 10,
  search,
  branchId,
}: GetAllStudiesParams = {}): Promise<GetAllStudiesResponse> => {
  const data = await apiGet<GetAllStudiesResponse>("/studies", {
    page,
    limit,
    search,
    branchId,
  });
  return data ?? { items: [], meta: { page, limit, total: 0, totalPages: 1 } };
};
