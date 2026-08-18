import { useEffect, useRef, useState } from "react";

import CardStudy from "../../../components/react/cards/CardStudy";
import Pagination from "../../../components/react/ui/Pagination";
import usePagination from "../../../hooks/usePagination";

import type { Study } from "../../../interfaces/study.interface";
import type { Service } from "../../../interfaces/service.interface";
import { getOneResource } from "../../../utils/getOneResource";

interface Props {
  slug: string;
  branchId?: string;
  initialStudies: Study[];
  initialPage: number;
  initialTotalPages: number;
  initialTotal: number;
}

const LIMIT = 12;

const ServiceStudiesCatalog = ({
  slug,
  branchId,
  initialStudies,
  initialPage,
  initialTotalPages,
  initialTotal,
}: Props) => {
  const [studies, setStudies] = useState<Study[]>(initialStudies);
  const [total, setTotal] = useState(initialTotal);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [isLoading, setIsLoading] = useState(false);
  const isFirstRun = useRef(true);

  const { currentPage, nextPage, prevPage, setPage } = usePagination({
    totalPages,
    initialPage,
  });

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    getOneResource<Service>("services", slug, {
      branchId,
      page: currentPage,
      limit: LIMIT,
    })
      .then((data) => {
        if (cancelled) return;
        setStudies(data?.studies?.data ?? []);
        setTotal(data?.studies?.total ?? 0);
        setTotalPages(data?.studies?.totalPages ?? 1);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [currentPage]);

  return (
    <div id="services-section">
      <div className="mb-8 flex items-center justify-end">
        <div className="inline-flex items-center gap-3 rounded-full bg-green-light/8 border border-green-light/15 px-5 py-2.5 shadow-xs">
          <span
            className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
              isLoading ? "bg-ui-border" : "bg-green-light"
            }`}
          />
          <span className="text-sm font-bold text-green-light">
            {isLoading ? "Cargando..." : `${total} Estudios`}
          </span>
        </div>
      </div>

      <div className="min-h-125">
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 transition-opacity ${
            isLoading ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          {studies.length > 0 ? (
            studies.map((study: Study, index: number) => (
              <div
                key={study.id}
                className="motion-safe:animate-fade-up"
                style={{ animationDelay: `${(index % 4) * 100}ms` }}
              >
                <CardStudy study={study} />
              </div>
            ))
          ) : (
            <div className="col-span-full py-32 flex flex-col items-center justify-center text-center bg-ui-bg/50 rounded-clinical-lg border-2 border-dashed border-ui-border">
              <div className="bg-white p-6 rounded-full shadow-sm shadow-ui-border/50 mb-6">
                <svg
                  className="w-16 h-16 text-ui-border"
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
              <h2 className="text-2xl font-black tracking-tight text-green-light">
                No encontramos estudios
              </h2>
              <p className="text-grey-custom mt-3 max-w-sm mx-auto leading-relaxed">
                No hay estudios disponibles en esta página del catálogo.
              </p>
            </div>
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 p-8 bg-ui-bg/50 rounded-clinical-lg border border-ui-border mt-8">
          <div className="order-2 sm:order-1">
            <Pagination
              nextPage={nextPage}
              prevPage={prevPage}
              currentPage={currentPage}
              onPageChange={setPage}
              totalPages={totalPages}
            />
          </div>

          <div className="order-1 sm:order-2 flex items-center gap-4">
            <div className="px-5 py-2.5 bg-white rounded-clinical-md shadow-xs border border-ui-border flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-grey-custom">
                Página
              </span>
              <span className="text-sm font-black text-green-light">
                {currentPage}
              </span>
              <span className="text-grey-custom/50">/</span>
              <span className="text-sm font-black text-grey-custom">
                {totalPages}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceStudiesCatalog;
