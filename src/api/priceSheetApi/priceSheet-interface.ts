import type { Study } from "../../interfaces/study.interface";

export interface StudyOnPriceSheetData {
  id: string;
  price: string;
  showPrice: boolean;
  studyId: string;
  priceSheetId: string;
  study: Study;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Nueva interfaz raíz para el objeto PriceSheet
export interface PriceSheet {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}

export interface PriceSheetResponse {
  priceSheet: PriceSheet;
  studyOnPriceSheets: {
    data: StudyOnPriceSheetData[];
    meta: PaginationMeta;
  };
}
