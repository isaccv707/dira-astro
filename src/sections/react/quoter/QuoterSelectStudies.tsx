import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import Button from "../../../components/react/buttons/Button";
import Pagination from "../../../components/react/ui/Pagination";
import CardQuoteStudy from "../../../components/react/cards/CardQuoteStudy";
import type { Study } from "../../../interfaces/study.interface";
import usePagination from "../../../hooks/usePagination";
import useGetPriceSheetStudies from "../../../hooks/useGetPriceSheetStudies";
import SearchServices from "../service/SearchServices";
import useSearchStudies from "../../../hooks/useSearchStudies";
import {
  getStoredBranchId,
  openBranchSelectorModal,
} from "../../../stores/branchStore";
import { useStore } from "@nanostores/react";
import {
  addStudy,
  removeStudy,
  selectedStudiesStore,
  ensureQuoterStudiesSynced,
} from "../../../stores/quoterStore";

const LIMIT = 4;

const QuoterSelectStudies = () => {
  const [totalPagesForHook, setTotalPagesForHook] = useState(1);
  const [branchId] = useState<string | null>(() => getStoredBranchId());

  const selectedStudies = useStore(selectedStudiesStore);

  useEffect(() => {
    ensureQuoterStudiesSynced();
  }, []);

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
    await openBranchSelectorModal();
  };

  if (!branchId) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-clinical-lg bg-green-light/10">
          <MapPin className="h-9 w-9 text-green-light" strokeWidth={1.5} />
        </div>

        <h3 className="text-lg font-black tracking-tight text-green-light">
          Selecciona una sucursal para cotizar
        </h3>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-grey-custom">
          Los precios varían por sucursal. Elige la tuya para ver tarifas y
          agregar estudios a tu cotización.
        </p>

        <Button
          type="button"
          onClick={handleOpenBranchSelector}
          variant="primary"
          size="lg"
          className="mt-8"
        >
          <MapPin className="h-4 w-4" />
          Elegir sucursal
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col px-4 py-6 sm:px-6 lg:px-8 lg:py-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="w-full sm:max-w-md">
          <SearchServices onSearchChange={handleSearchChange} />
        </div>

        <div className="inline-flex w-fit items-center gap-2 self-start rounded-full border border-green-primary/15 bg-green-primary/8 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-green-primary sm:self-auto">
          <span className="h-1.5 w-1.5 rounded-full bg-green-primary" />
          {isFetching ? "Buscando..." : `${totalStudies} disponibles`}
        </div>
      </div>

      <div className="mt-5 flex-1">
        {isLoading ? (
          <div className="py-10 text-center text-grey-custom">
            Cargando estudios...
          </div>
        ) : isError ? (
          <div className="py-10 text-center text-grey-custom">
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
              <p className="col-span-1 text-center text-grey-custom sm:col-span-2 lg:col-span-3 xl:col-span-4">
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

        <div className="self-end bg-green-light px-3 py-1 text-sm font-semibold text-white shadow-inner rounded-clinical-sm sm:self-auto">
          {`${currentPage} / ${totalPages || 1}`}
        </div>
      </div>
    </div>
  );
};

export default QuoterSelectStudies;
