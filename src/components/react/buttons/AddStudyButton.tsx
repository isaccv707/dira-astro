import { FiCheckCircle, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import type { Study } from "../../../interfaces/study.interface";

interface AddStudyButtonProps {
  isAdded: boolean;
  handleAddStudy: (study: Study) => void;
  handleDeletStudy: (studyId: string) => void;
  study: Study;
}
const AddStudyButton = ({
  isAdded,
  handleAddStudy,
  study,
  handleDeletStudy,
}: AddStudyButtonProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <button
      type="button"
      onClick={
        !isAdded
          ? () => handleAddStudy(study)
          : () => handleDeletStudy(study.id)
      }
      onMouseEnter={() => setHoveredId(study.id)}
      onMouseLeave={() => setHoveredId(null)}
      className={`mt-3 w-full py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer
                     ${
                       isAdded
                         ? hoveredId === study.id
                           ? "bg-red-600 text-white hover:bg-red-700"
                           : "bg-gray-200 text-gray-600"
                         : "bg-green-600 hover:bg-green-700 text-white"
                     }`}
    >
      {isAdded ? (
        hoveredId === study.id ? (
          <>
            <FiTrash2 />
            Eliminar
          </>
        ) : (
          <>
            <FiCheckCircle className="text-green-600" />
            Agregado
          </>
        )
      ) : (
        "Agregar"
      )}
    </button>
  );
};

export default AddStudyButton;
