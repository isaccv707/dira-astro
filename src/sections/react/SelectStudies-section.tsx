import { useEffect, useState, type ChangeEvent } from "react";
import Pagination from "../../components/react/ui/Pagination";
import TextInput from "../../components/react/form/TextInput";
import CardQuoteStudy from "../../components/react/cards/CardQuoteStudy";
import type { Study } from "../../interfaces/study.interface";
import usePagination from "../../hooks/usePagination";
import { useGetAllStudiesQuery } from "../../api/studiesApi/StudyApi";
import useGetAllStudies from "./service/hooks/useGetAllStudies";


interface SelectStudiesSectionProps {
  studies: Study[];
  addStudy: (study: Study) => void;
  removeStudy: (studyId: string) => void
}
const LIMIT = 5;

const SelectStudiesSection = ({ addStudy, removeStudy }: SelectStudiesSectionProps) => {
  const [search, setSearch] = useState("");
  const [totalPagesForHook, setTotalPagesForHook] = useState(1);

  const {
    currentPage,
    nextPage,
    prevPage,
    setPage,
  } = usePagination({
    totalPages: totalPagesForHook,
    initialPage: 1,
  });

  const {
    studies,
    totalPages,
    isLoading,
    isFetching,
    isError,
  } = useGetAllStudies({
    page: currentPage,
    limit: LIMIT,
  });

  useEffect(() => {
    setTotalPagesForHook(totalPages || 1);
  }, [totalPages]);

  const handleAddStudy = (study: Study) => addStudy(study);
  const handleDeletStudy = (studyId: string) => removeStudy(studyId)

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  return (
    <div className="px-8 flex flex-col h-full p-10">
      <div className="flex justify-between items-center">
        <TextInput
          id="searchStudies"
          label="Selecciona tus estudios"
          name="searchStudies"
          onChange={handleSearch}
          placeholder="Buscar estudios"
          value={search}
        />
      </div>

      <div className="mt-6 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-5">
          {studies.length > 0 ? (
            studies.map((study) => {
              const isAdded = studies.some((s) => s.id === study.id);
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
            <p className="text-gray-500 text-center col-span-1 sm:col-span-5">
              No se encontraron estudios.
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col h-full">
        <div className="mt-10 flex items-center justify-between">
          <Pagination
            nextPage={nextPage}
            prevPage={prevPage}
            currentPage={currentPage}
            onPageChange={setPage}
            totalPages={totalPages}
          />

          <div className="bg-green-secondary text-white font-semibold px-3 py-1 rounded-2xl text-sm shadow-inner">
            {`${currentPage} / ${totalPages || 1}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectStudiesSection;
