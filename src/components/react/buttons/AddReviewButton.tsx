import { openModal } from "../../../stores/modalStore";
import Button from "./Button";

interface AddReviewButtonProps {
  modalId?: string;
}

const AddReviewButton = ({ modalId = "MODA_REVIEW_FROM" }: AddReviewButtonProps) => (
  <Button
    type="button"
    text="Escribir una reseña"
    variant="outline"
    size="md"
    onClick={() => openModal(modalId, { title: "Escribe tu reseña" })}
  />
);

export default AddReviewButton;
