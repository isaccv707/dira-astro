import { useForm } from "react-hook-form";
import Modal from "./Modal";
import FormProvider from "../hk-form/FormProvider";
import RHFTextInput from "../hk-form/RHFTextInput";
import Button from "../buttons/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ReviewSchema,
  type ReviewFormValues,
} from "../../../schemas/review-form/reviewFormSchema";
import { toast } from "react-toastify";
import { modalStore, closeModal } from "../../../stores/modalStore";
import { useStore } from "@nanostores/react";
import { useState } from "react";
import { createReview } from "../../../api/reviewsApi/reviewsApi";

interface ModalReviewFromProps {
  id?: string;
  title?: string;
}

const ModalReviewFrom = ({
  id = "MODA_REVIEW_FROM",
  title = "Ingresa una reseña",
}: ModalReviewFromProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen, view } = useStore(modalStore);

  const methods = useForm<ReviewFormValues>({
    defaultValues: {
      fullName: "",
      comment: "",
      rating: 1,
    },
    resolver: yupResolver(ReviewSchema),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async ({ fullName, comment, rating }: ReviewFormValues) => {
    setIsSubmitting(true);
    try {
      const branchId = localStorage.getItem("dyra_branch_id") ?? "";
      const payload = {
        fullName,
        comment,
        rating,
        branchId,
      };
      await createReview(payload);
      toast.success("Reseña enviada con éxito");
      reset();
      closeModal();
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error al enviar la reseña:", error);
      toast.error("Error al enviar la reseña");
    }
  };

  if (!isOpen || view !== id) return null;

  return (
    <Modal id={id} title={title} onClose={closeModal} open={isOpen}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFTextInput
          id="fullName"
          label="Nombre"
          name="fullName"
          placeholder="Ingresa tu nombre completo"
        />
        <RHFTextInput
          id="comment"
          label="Comentario"
          name="comment"
          placeholder="Comentario"
        />
        <RHFTextInput
          id="rating"
          type="number"
          label="Calificación"
          name="rating"
          placeholder="Ingrese calificación"
        />
        <div className="mt-3">
          <Button
            type="submit"
            disabled={isSubmitting}
            text={isSubmitting ? "Enviando..." : "Enviar Reseña"}
            variant={"primary"}
            size={"md"}
            width={"full"}
            align={"center"}
          />
        </div>
      </FormProvider>
    </Modal>
  );
};

export default ModalReviewFrom;
