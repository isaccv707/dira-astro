import type { Study } from "../../interfaces/study.interface";

export type GetAllStudiesParams = {
    page?: number;
    limit?: number;
    search?: string;
    branchId?: string;
}

export interface GetAllStudiesResponse {
    data: Study[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}