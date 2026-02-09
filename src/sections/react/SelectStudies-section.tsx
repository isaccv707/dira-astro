import { useCallback, useEffect, useState } from "react";
import Pagination from "../../components/react/ui/Pagination";
import TextInput from "../../components/react/form/TextInput";
import CardQuoteStudy from "../../components/react/cards/CardQuoteStudy";
import type { Study } from "../../interfaces/study.interface";
import usePagination from "../../hooks/usePagination";
import useGetAllStudies from "./service/hooks/useGetAllStudies";
import { useQuoterContext } from "../../hooks/useQuoterContext";
import FormProvider from "../../components/react/hk-form/FormProvider";
import { useForm } from "react-hook-form";
import SearchServices from "./service/SearchServices";
import useSearchStudies from "../../hooks/useSearchStudies";

interface Inputs {
  searchStudies: string;
}

const LIMIT = 4;

const SelectStudiesSection = () => {
  const [totalPagesForHook, setTotalPagesForHook] = useState(1);

  const { addStudy, removeStudy, selectedStudies } = useQuoterContext();

  const methods = useForm<Inputs>({
    defaultValues: { searchStudies: "" },
  });

  const { handleSubmit } = methods;

  const { currentPage, nextPage, prevPage, setPage } = usePagination({
    totalPages: totalPagesForHook,
    initialPage: 1,
  });
  const { search, handleSearchChange } = useSearchStudies({
    setPage,
  });

  const { studies, totalPages, isLoading, isFetching, isError } = useGetAllStudies({
    page: currentPage,
    limit: LIMIT,
    search,
  });

  const totalStudies = studies.length * totalPages

  useEffect(() => {
    setTotalPagesForHook(totalPages || 1);
  }, [totalPages]);

  const handleAddStudy = (study: Study) => addStudy(study);
  const handleDeletStudy = (studyId: string) => removeStudy(studyId);

  const handleSearch = () => { };

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
          <div className="py-10 text-center text-black/50">Cargando estudios...</div>
        ) : isError ? (
          <div className="py-10 text-center text-black/50">
            Ocurrió un error al cargar los estudios.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {studies.length > 0 ? (
              studies.map((study) => {
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

        <div className="self-end bg-green-ligth px-3 py-1 text-sm font-semibold text-white shadow-inner rounded-2xl sm:self-auto">
          {`${currentPage} / ${totalPages || 1}`}
        </div>
      </div>
    </div>
  );
};

export default SelectStudiesSection;
