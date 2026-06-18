import { useEffect, useState, useCallback } from "react";
import { getAllStudies } from "../api/studiesApi/studiesApi";

interface useGetAllStudiesProps {
  page: number;
  limit: number;
  search?: string;
}

interface StudiesState {
  data: any; // Cambiado a any para flexibilidad en la extracción
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: any;
}

const useGetAllStudies = ({ limit, page, search }: useGetAllStudiesProps) => {
  const [state, setState] = useState<StudiesState>({
    data: null,
    isLoading: true,
    isFetching: false,
    isError: false,
    error: null,
  });

  const fetchStudies = useCallback(async () => {
    setState((prev) => ({ ...prev, isFetching: true, isError: false }));

    try {
      const response = await getAllStudies({ page, limit, search });

      setState((prev) => ({
        ...prev,
        data: response,
        isLoading: false,
        isFetching: false,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        isFetching: false,
        isError: true,
        error: err,
      }));
    }
  }, [page, limit, search]);

  useEffect(() => {
    fetchStudies();
  }, [fetchStudies]);

  const rawData = state.data;
  const finalData = rawData?.data || rawData;

  let studies = [];
  if (Array.isArray(finalData)) {
    studies = finalData;
  } else if (Array.isArray(finalData?.items)) {
    studies = finalData.items;
  } else if (Array.isArray(finalData?.studies)) {
    studies = finalData.studies;
  }

  const meta = finalData?.meta;
  const totalStudies = meta?.total ?? studies.length;
  const totalPages = meta?.totalPages ?? 1;

  return {
    studies,
    meta,
    totalPages,
    totalStudies,
    isLoading: state.isLoading,
    isFetching: state.isFetching,
    isError: state.isError,
    error: state.error,
  };
};

export default useGetAllStudies;
