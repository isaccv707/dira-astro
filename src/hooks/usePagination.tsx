import { useEffect, useMemo, useState } from "react";

interface UsePaginationProps {
  totalPages: number;
  initialPage?: number;
}

const usePagination = ({ totalPages, initialPage = 1 }: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(initialPage);


  useEffect(() => {
    const safeTotalPages = Math.max(totalPages || 1, 1);
    setCurrentPage((p) => Math.min(Math.max(p, 1), safeTotalPages));
  }, [totalPages]);

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, Math.max(totalPages || 1, 1)));

  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const setPage = (page: number) =>
    setCurrentPage(() => {
      const safeTotalPages = Math.max(totalPages || 1, 1);
      return Math.min(Math.max(page, 1), safeTotalPages);
    });

  return useMemo(
    () => ({
      currentPage,
      totalPages: Math.max(totalPages || 1, 1),
      nextPage,
      prevPage,
      setPage,
      setCurrentPage,
    }),
    [currentPage, totalPages]
  );
};

export default usePagination;
