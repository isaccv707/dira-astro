import { useMemo, useState } from "react";


interface usePaginationProps {
  totalItems: number;
  itemsPerPage: number;
  initialPage?: number;
}

const usePagination = ({ itemsPerPage, totalItems, initialPage }: usePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);


  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, totalPages));
  const setPage = (page: number) =>
    setCurrentPage(() => Math.min(Math.max(page, 1), totalPages));

  const paginationInfo = useMemo(
    () => ({
      currentPage,
      totalPages,
      startIndex,
      endIndex,
      itemsPerPage,
    }),
    [currentPage, totalPages, startIndex, endIndex, itemsPerPage]
  );

  return {
    ...paginationInfo,
    nextPage,
    prevPage,
    setPage,
    setCurrentPage,
  };
}

export default usePagination
