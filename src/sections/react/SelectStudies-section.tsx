import { useState, type ChangeEvent } from "react";
import Button from "../../components/react/ui/Button";
import Pagination from "../../components/react/ui/Pagination";
import TextInput from "../../components/react/form/TextInput";
import CardQuoteStudy from "../../components/react/cards/CardQuoteStudy";
import type { Study } from "../../interfaces/study.interface";
import { IoIosReturnLeft } from "react-icons/io";
import { motion } from "framer-motion";
import usePagination from "../../hooks/usePagination";
import { useQuoterContext } from "../../hooks/useQuoterContext";
import { useGetAllStudiesQuery } from "../../api/studiesApi/StudyApi";


interface SelectStudiesSectionProps {
  onBack: () => void;
  studies: Study[];
  addStudy: (study: Study) => void;
  removeStudy: (studyId: string) => void
}

const allStudies: Study[] = [
  { id: "1", name: "Biometría Hemática", price: 120, },
  { id: "2", name: "Glucosa en sangre", price: 80, },
  { id: "3", name: "Prueba de embarazo", price: 100, },
  { id: "4", name: "Colesterol total", price: 90, },
  { id: "5", name: "Urea", price: 110, },
  { id: "6", name: "Biometría Hemática", price: 120, },
  { id: "7", name: "Glucosa en sangre", price: 80, },
  { id: "8", name: "Prueba de embarazo", price: 100, },
  { id: "9", name: "Colesterol total", price: 90, },
  { id: "10", name: "Urea", price: 110, },
];

const SelectStudiesSection = ({ onBack, studies, addStudy, removeStudy }: SelectStudiesSectionProps) => {
  const [search, setSearch] = useState("");

  const { data = [] } = useGetAllStudiesQuery();

  const filteredStudies = data?.filter((study) =>
    study.name.toLowerCase().includes(search.toLowerCase())
  );

  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    nextPage,
    prevPage,
    setPage,
  } = usePagination({
    totalItems: filteredStudies.length,
    itemsPerPage: 5,
    initialPage: 1,
  });

  const handleAddStudy = (study: Study) => addStudy(study);
  const handleDeletStudy = (studyId: string) => removeStudy(studyId)


  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }
  const visibleStudies = filteredStudies.slice(startIndex, endIndex);
  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl space-y-6">
      <div className="flex justify-between items-center">
        <TextInput
          id="searchStudies"
          label="Selecciona tus estudios"
          name="searchStudies"
          onChange={handleSearch}
          placeholder="Buscar estudios"
          value={search}
        />
        <Button
          text="Regresar"
          variant={'GoBack'}
          size={"sm"}
          icon={<IoIosReturnLeft />}
          onClick={onBack}
        />
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-5 gap-5 mt-6"
      >
        {visibleStudies.length > 0 ? (
          visibleStudies.map((study) => {
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
          <p className="text-gray-500 text-center col-span-2">
            No se encontraron estudios.
          </p>
        )}
      </motion.div>

      <Pagination
        nextPage={nextPage}
        prevPage={prevPage}
        currentPage={currentPage}
        onPageChange={setPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default SelectStudiesSection;
