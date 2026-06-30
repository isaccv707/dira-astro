import { useEffect, useState, useCallback } from "react";
import { getAllStudies } from "../api/studiesApi/studiesApi";
import type { Study } from "../interfaces/study.interface";

interface Props {
  page: number;
  limit: number;
  search?: string;
  branchId: string | null;
}

interface State {
  studies: Study[];
  totalStudies: number;
  totalPages: number;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: unknown;
}

const useGetPriceSheetStudies = ({ limit, page, search, branchId }: Props) => {
  const [state, setState] = useState<State>({
    studies: [],
    totalStudies: 0,
    totalPages: 1,
    isLoading: true,
    isFetching: false,
    isError: false,
    error: null,
  });

  const fetchStudies = useCallback(async () => {
    setState((prev) => ({ ...prev, isFetching: true, isError: false }));

    try {
      const raw = (await getAllStudies({
        page,
        limit,
        search,
        branchId: branchId ?? undefined,
      })) as any;

      const items: Study[] = (raw.data ?? raw.items ?? []) as unknown as Study[];
      const totalStudies: number = raw.total ?? raw.meta?.total ?? 0;
      const totalPages: number = raw.totalPages ?? raw.meta?.totalPages ?? 1;

      setState({
        studies: items,
        totalStudies,
        totalPages,
        isLoading: false,
        isFetching: false,
        isError: false,
        error: null,
      });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        isFetching: false,
        isError: true,
        error: err,
      }));
    }
  }, [branchId, page, limit, search]);

  useEffect(() => {
    fetchStudies();
  }, [fetchStudies]);

  return state;
};

export default useGetPriceSheetStudies;
