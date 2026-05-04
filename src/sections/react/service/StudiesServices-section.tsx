import { useEffect, useState } from "react";
import usePagination from "../../../hooks/usePagination";
import useGetAllStudies from "./hooks/useGetAllStudies";
import type { Study } from "../../../interfaces/study.interface";
import SearchServices from "./SearchServices";
import Pagination from "../../../components/react/ui/Pagination";
import useSearchStudies from "../../../hooks/useSearchStudies";
import CardStudy from "../../../components/react/cards/CardStudy";
import StudyCardSkeleton from "../../../components/react/skeleton/StudyCardSkeleton";

const LIMIT = 8;

const StudiesServices = () => {
  const [totalPagesForHook, setTotalPagesForHook] = useState(1);

  const { currentPage, nextPage, prevPage, setPage } = usePagination({
    totalPages: totalPagesForHook,
    initialPage: 1,
  });

  const { search, handleSearchChange } = useSearchStudies({
    setPage,
  });

  const { studies, totalStudies, totalPages, isLoading, isFetching, isError } =
    useGetAllStudies({
      page: currentPage,
      limit: LIMIT,
      search: search,
    });
  console.log(studies);

  useEffect(() => {
    setTotalPagesForHook(totalPages || 1);
  }, [totalPages]);

  return (
    <div id="services-section">
      <div className="sticky top-0 z-30  backdrop-blur-md mb-8 border-b border-gray-50">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full lg:max-w-xl">
            <SearchServices onSearchChange={handleSearchChange} />
          </div>

          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-3 rounded-2xl bg-green-ligth/5 border border-green-ligth/10 px-5 py-2.5 shadow-sm">
              <div className="relative flex h-2.5 w-2.5">
                {isFetching && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-ligth opacity-75"></span>
                )}
                <span
                  className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isFetching ? "bg-green-ligth" : "bg-gray-300"}`}
                ></span>
              </div>
              <span className="text-sm font-bold text-green-ligth">
                {isFetching
                  ? "Sincronizando..."
                  : `${totalStudies || 0} Estudios`}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-[500px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {isLoading ? (
            Array.from({ length: LIMIT }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <StudyCardSkeleton />
              </div>
            ))
          ) : studies && studies.length > 0 ? (
            studies.map((study: Study, index: number) => (
              <div
                key={study.id}
                className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
                style={{ animationDelay: `${(index % 4) * 100}ms` }}
              >
                <CardStudy study={study} />
              </div>
            ))
          ) : (
            <div className="col-span-full py-32 flex flex-col items-center justify-center text-center bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-200 animate-in zoom-in-95 duration-500">
              <div className="bg-white p-6 rounded-full shadow-xl shadow-gray-200/50 mb-6">
                <svg
                  className="w-16 h-16 text-gray-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-black text-gray-800">
                No encontramos resultados
              </h2>
              <p className="text-gray-500 mt-3 max-w-sm mx-auto leading-relaxed">
                Prueba buscando con palabras más generales o revisa si hay algún
                error de escritura.
              </p>
              <button
                onClick={() =>
                  handleSearchChange({ target: { value: "" } } as any)
                }
                className="mt-8 px-6 py-2 bg-green-ligth text-white font-bold rounded-xl hover:bg-green-primary transition-colors"
              >
                Limpiar búsqueda
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer Navigation */}
      {!isLoading && studies && studies.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 p-8 bg-gray-50/50 rounded-[2.5rem] border border-gray-100">
          <div className="order-2 sm:order-1">
            <Pagination
              nextPage={nextPage}
              prevPage={prevPage}
              currentPage={currentPage}
              onPageChange={setPage}
              totalPages={totalPages || 1}
            />
          </div>

          <div className="order-1 sm:order-2 flex items-center gap-4">
            <div className="px-5 py-2.5 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                Página
              </span>
              <span className="text-sm font-black text-green-ligth">
                {currentPage}
              </span>
              <span className="text-gray-300">/</span>
              <span className="text-sm font-black text-gray-400">
                {totalPages || 1}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudiesServices;
