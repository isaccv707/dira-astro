import { useCallback, useEffect, useState } from "react";
import type { Service } from "../../../interfaces/service.interface"
import usePagination from "../../../hooks/usePagination";
import useGetAllStudies from "./hooks/useGetAllStudies";
import type { Study } from "../../../interfaces/study.interface";
import SearchServices from "./SearchServices";
import CardStudy from "../../../components/react/cards/CardStudy";
import Pagination from "../../../components/react/ui/Pagination";


const LIMIT = 10;

const StudiesServices = () => {
  const [search, setSearch] = useState("");
  const [totalPagesForHook, setTotalPagesForHook] = useState(1);

  const { currentPage, nextPage, prevPage, setPage } = usePagination({
    totalPages: totalPagesForHook,
    initialPage: 1,
  });

  const {
    studies,
    totalStudies,
    totalPages,
    isLoading,
    isFetching,
    isError,
  } = useGetAllStudies({
    page: currentPage,
    limit: LIMIT,
    search: search,
  });

  useEffect(() => {
    setTotalPagesForHook(totalPages || 1);
  }, [totalPages]);

  const normalize = (v: string) => v.trim().replace(/\s+/g, " ");

  const handleSearchChange = useCallback((value: string) => {
    const next = normalize(value);

    setSearch((prev) => {
      const prevNorm = normalize(prev);
      if (prevNorm === next) return prev;
      return next;
    });

    setPage(1);
  }, [setPage]);

  return (
    <div id="services-section">

      <div className="w-full flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-md">
          <SearchServices onSearchChange={handleSearchChange} />
        </div>

        <div className="flex w-full sm:w-auto sm:justify-end">
          <div className="inline-flex items-center justify-center gap-2 rounded-full bg-green-primary/10 px-4 py-2 text-xs font-semibold text-green-primary">
            <span
              className={`h-2 w-2 rounded-full bg-green-primary ${isFetching ? "animate-pulse" : ""
                }`}
            />
            {isFetching ? "Buscando..." : `${totalStudies} disponibles`}
          </div>
        </div>
      </div>


      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center mt-10"
      >
        {
          studies && studies.length > 0 ? (
            studies.map((study: Study) => (
              <CardStudy
                key={study.id}
                path={"/contact"}
                id={study.id}
                title={study.name}
                price={study.price}
              />
            ))
          ) : (
            <h2 className="text-gray-500 text-center col-span-full">
              Sin servicios para mostrar
            </h2>
          )
        }
      </div>

      <div className="flex flex-col h-full">
        <div className="mt-10 flex items-center justify-between">
          <Pagination
            nextPage={nextPage}
            prevPage={prevPage}
            currentPage={currentPage}
            onPageChange={setPage}
            totalPages={totalPages || 1}
          />

          <div className="bg-green-secondary text-white font-semibold px-3 py-1 rounded-2xl text-sm shadow-inner">
            {`${currentPage} / ${totalPages || 1}`}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudiesServices
