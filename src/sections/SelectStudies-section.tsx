import { useState, type ChangeEvent } from "react";
import Button from "../components/react/ui/Button";
import Pagination from "../components/react/ui/Pagination";
import TextInput from "../components/react/form/TextInput";
import ButtonAddStudy from "../components/react/ui/ButtonAddStudy";
import CardQuoteStudy from "../components/react/cards/CardQuoteStudy";
import type { Study } from "../interfaces/study.interface";
import { IoIosReturnLeft } from "react-icons/io";
import { motion } from "framer-motion";
import usePagination from "../hooks/usePagination";


interface SelectStudiesSectionProps {
  onBack: () => void;
  studies: Study[];
  addStudy: (study: Study) => void;
  removeStudy: (studyId: string) => void
}

const allStudies: Study[] = [
  { id: "1", name: "Biometría Hemática", price: 120, quantity: 1 },
  { id: "2", name: "Glucosa en sangre", price: 80, quantity: 1 },
  { id: "3", name: "Prueba de embarazo", price: 100, quantity: 1 },
  { id: "4", name: "Colesterol total", price: 90, quantity: 1 },
  { id: "5", name: "Urea", price: 110, quantity: 1 },
  { id: "6", name: "Biometría Hemática", price: 120, quantity: 1 },
  { id: "7", name: "Glucosa en sangre", price: 80, quantity: 1 },
  { id: "8", name: "Prueba de embarazo", price: 100, quantity: 1 },
  { id: "9", name: "Colesterol total", price: 90, quantity: 1 },
  { id: "10", name: "Urea", price: 110, quantity: 1 },
];

const SelectStudiesSection = ({ onBack, studies, addStudy, removeStudy }: SelectStudiesSectionProps) => {
  const [search, setSearch] = useState("");

  const filteredStudies = allStudies.filter((study) =>
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
    itemsPerPage: 4,
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
