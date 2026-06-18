import { useEffect, useState, useCallback } from "react";
import { getPriceSheet } from "../api/priceSheetApi/priceSheetApi";
import type { Study } from "../interfaces/study.interface";

interface useGetPriceSheetStudiesProps {
  page: number;
  limit: number;
  search?: string;
  priceSheetId: string | null;
}

interface PriceSheetStudiesState {
  studies: Study[];
  totalStudies: number;
  totalPages: number;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: any;
}

const useGetPriceSheetStudies = ({
  limit,
  page,
  search,
  priceSheetId,
}: useGetPriceSheetStudiesProps) => {
  const [state, setState] = useState<PriceSheetStudiesState>({
    studies: [],
    totalStudies: 0,
    totalPages: 1,
    isLoading: true,
    isFetching: false,
    isError: false,
    error: null,
  });

  const fetchPriceSheet = useCallback(async () => {
    if (!priceSheetId) {
      setState((prev) => ({
        ...prev,
        studies: [],
        isLoading: false,
        isFetching: false,
      }));
      return;
    }

    setState((prev) => ({ ...prev, isFetching: true, isError: false }));

    try {
      const response = await getPriceSheet(priceSheetId, page, limit, search);

      if (response) {
        const mappedStudies: Study[] = response.studyOnPriceSheets.data.map(
          (item) => ({
            ...item.study,
            priceInfo: {
              ...item.study.priceInfo,
              price: Number(item.price),
              showPrice: item.showPrice,
            },
          }),
        );

        setState({
          studies: mappedStudies,
          totalStudies: response.studyOnPriceSheets.meta.total,
          totalPages: response.studyOnPriceSheets.meta.totalPages,
          isLoading: false,
          isFetching: false,
          isError: false,
          error: null,
        });
      } else {
        throw new Error("No se pudo obtener la hoja de precios");
      }
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        isFetching: false,
        isError: true,
        error: err,
      }));
    }
  }, [priceSheetId, page, limit, search]);

  useEffect(() => {
    fetchPriceSheet();
  }, [fetchPriceSheet]);

  return {
    ...state,
  };
};

export default useGetPriceSheetStudies;
