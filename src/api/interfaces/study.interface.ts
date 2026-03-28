import type { Study } from "../../interfaces/study.interface";

export type GetAllStudiesParams = {
    page?: number;
    limit?: number;
    search?: string;
}

export interface GetAllStudiesResponse {
    items: Study[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    }
}