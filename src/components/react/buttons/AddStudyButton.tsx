import { FiCheckCircle, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import type { Study } from "../../../interfaces/study.interface";
import Button from "./Button";

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

  const isHovered = hoveredId === study.id;

  return (
    <Button
      type="button"
      onClick={
        !isAdded
          ? () => handleAddStudy(study)
          : () => handleDeletStudy(study.id)
      }
      onMouseEnter={() => setHoveredId(study.id)}
      onMouseLeave={() => setHoveredId(null)}
      variant={isAdded ? (isHovered ? "danger" : "neutral") : "primary"}
      width="full"
      className="mt-3"
    >
      {isAdded ? (
        isHovered ? (
          <>
            <FiTrash2 />
            Eliminar
          </>
        ) : (
          <>
            <FiCheckCircle className="text-green-primary" />
            Agregado
          </>
        )
      ) : (
        "Agregar"
      )}
    </Button>
  );
};

export default AddStudyButton;
