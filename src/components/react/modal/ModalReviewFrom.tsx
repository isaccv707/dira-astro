import { useForm } from "react-hook-form";
import Modal from "./Modal";
import FormProvider from "../hk-form/FormProvider";
import RHFTextInput from "../hk-form/RHFTextInput";
import Button from "../ui/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ReviewSchema,
  type ReviewFormValues,
} from "../../../schemas/review-form/reviewFormSchema";
import { toast } from "react-toastify";
import { modalStore, closeModal } from "../../../stores/modalStore";
import { useStore } from "@nanostores/react";

interface ModalReviewFromProps {
  id?: string;
  title?: string;
  data?: any;
}

const ModalReviewFrom = ({
  id = "MODA_REVIEW_FROM",
  title = "Ingresa una reseña",
  data,
}: ModalReviewFromProps) => {
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

  const onSubmit = async (formData: ReviewFormValues) => {
    try {
      reset();
      closeModal();
      toast.success("Reseña enviada con éxito");
    } catch (error) {
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
            text="Enviar Reseña"
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
