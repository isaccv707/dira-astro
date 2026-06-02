import { openModal } from "../../../stores/modalStore";
import Button from "./Button";

interface AddReviewButtonProps {
  modalId?: string;
}

const AddReviewButton = ({
  modalId = "MODA_REVIEW_FROM",
}: AddReviewButtonProps) => {
  const handleOpenModal = () => {
    openModal(modalId, {
      title: "Dejar opinion",
    });
  };

  return (
    <Button
      type="button"
      text="Agregar Reseña"
      variant="primary"
      onClick={handleOpenModal}
    />
  );
};

export default AddReviewButton;
