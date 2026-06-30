import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import Pagination from "../../../components/react/ui/Pagination";
import CardQuoteStudy from "../../../components/react/cards/CardQuoteStudy";
import type { Study } from "../../../interfaces/study.interface";
import usePagination from "../../../hooks/usePagination";
import useGetPriceSheetStudies from "../../../hooks/useGetPriceSheetStudies";
import { useQuoterContext } from "../../../hooks/useQuoterContext";
import SearchServices from "../service/SearchServices";
import useSearchStudies from "../../../hooks/useSearchStudies";
import { openModal } from "../../../stores/modalStore";
import { getAllBranches } from "../../../api/branchesApi/branchesApi";

const LIMIT = 4;

const QuoterSelectStudies = () => {
  const [totalPagesForHook, setTotalPagesForHook] = useState(1);
  const [branchId] = useState<string | null>(() =>
    typeof window !== "undefined" ? localStorage.getItem("dyra_branch_id") : null
  );

  const { addStudy, removeStudy, selectedStudies } = useQuoterContext();

  const { currentPage, nextPage, prevPage, setPage } = usePagination({
    totalPages: totalPagesForHook,
    initialPage: 1,
  });
  const { search, handleSearchChange } = useSearchStudies({ setPage });

  const { studies, totalPages, isLoading, isFetching, isError, totalStudies } =
    useGetPriceSheetStudies({
      page: currentPage,
      limit: LIMIT,
      search,
      branchId,
    });

  useEffect(() => {
    setTotalPagesForHook(totalPages || 1);
  }, [totalPages]);

  const handleAddStudy = (study: Study) => addStudy(study);
  const handleDeletStudy = (studyId: string) => removeStudy(studyId);

  const handleOpenBranchSelector = async () => {
    const branches = await getAllBranches();
    openModal("MODAL_SELECT_BRANCH", {
      title: "Elige la sucursal de tu preferencia",
      data: branches,
    });
  };

  if (!branchId) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-green-light/10">
          <MapPin className="h-9 w-9 text-green-light" strokeWidth={1.5} />
        </div>

        <h3 className="text-lg font-bold text-gray-900">
          Selecciona una sucursal para cotizar
        </h3>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-500">
          Los precios varían por sucursal. Elige la tuya para ver tarifas y
          agregar estudios a tu cotización.
        </p>

        <button
          onClick={handleOpenBranchSelector}
          className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-green-light px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-green-primary focus:outline-none focus:ring-2 focus:ring-green-light focus:ring-offset-2"
        >
          <MapPin className="h-4 w-4" />
          Elegir sucursal
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col px-4 py-6 sm:px-6 lg:px-8 lg:py-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="w-full sm:max-w-md">
          <SearchServices onSearchChange={handleSearchChange} />
        </div>

        <div className="text-sm text-black/60 sm:text-right">
          {isFetching ? "Buscando..." : `${totalStudies} disponibles`}
        </div>
      </div>

      <div className="mt-5 flex-1">
        {isLoading ? (
          <div className="py-10 text-center text-black/50">
            Cargando estudios...
          </div>
        ) : isError ? (
          <div className="py-10 text-center text-black/50">
            Ocurrió un error al cargar los estudios.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {studies.length > 0 ? (
              studies.map((study: Study) => {
                const isAdded = selectedStudies.some((s) => s.id === study.id);
                return (
                  <CardQuoteStudy
                    key={study.id}
                    isAdded={isAdded}
                    handleAddStudy={handleAddStudy}
                    handleDeletStudy={handleDeletStudy}
                    study={study}
                  />
                );
              })
            ) : (
              <p className="col-span-1 text-center text-gray-500 sm:col-span-2 lg:col-span-3 xl:col-span-4">
                No se encontraron estudios.
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Pagination
          nextPage={nextPage}
          prevPage={prevPage}
          currentPage={currentPage}
          onPageChange={setPage}
          totalPages={totalPages}
        />

        <div className="self-end bg-green-light px-3 py-1 text-sm font-semibold text-white shadow-inner rounded-2xl sm:self-auto">
          {`${currentPage} / ${totalPages || 1}`}
        </div>
      </div>
    </div>
  );
};

export default QuoterSelectStudies;
