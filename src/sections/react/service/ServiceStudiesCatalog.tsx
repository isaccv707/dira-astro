import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";

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
const SEARCH_DEBOUNCE_MS = 350;

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
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const isFirstRun = useRef(true);

  const { currentPage, nextPage, prevPage, setPage } = usePagination({
    totalPages,
    initialPage,
  });

  // Debounce the raw input, then reset to page 1 once the committed search
  // term actually changes so the fetch effect below only fires once.
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  useEffect(() => {
    if (isFirstRun.current) return;
    setPage(1);
  }, [search]);

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
      search,
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
  }, [currentPage, search]);

  const handleClearSearch = () => setSearchInput("");

  return (
    <div id="services-section">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-grey-custom/70" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Buscar por nombre o código..."
            aria-label="Buscar estudios por nombre o código"
            className="w-full rounded-clinical-sm border border-ui-border bg-white py-2.5 pl-10 pr-9 text-sm text-green-light placeholder:text-grey-custom/70 transition focus:border-green-primary focus:outline-none focus:ring-2 focus:ring-green-primary"
          />
          {searchInput && (
            <button
              type="button"
              onClick={handleClearSearch}
              aria-label="Limpiar búsqueda"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-grey-custom/70 transition hover:text-green-light"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="inline-flex shrink-0 items-center gap-3 self-start rounded-full bg-green-light/8 border border-green-light/15 px-5 py-2.5 shadow-xs sm:self-auto">
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
                {search
                  ? `No hay resultados para "${search}". Intenta con otro nombre o código.`
                  : "No hay estudios disponibles en esta página del catálogo."}
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
