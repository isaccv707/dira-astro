import { useForm } from "react-hook-form";
import useModalManager from "../../../hooks/useModalManager";
import Modal from "./Modal"
import FormProvider from "../hk-form/FormProvider";
import RHFTextInput from "../hk-form/RHFTextInput";
import Button from "../ui/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { ReviewSchema, type ReviewFormValues } from "../../../schemas/review-form/reviewFormSchema";
import { useCreateReviewMutation } from "../../../api/reviewsApi/reviewsApi";
import { toast } from "react-toastify";

interface ModalReviewFromProps {
    id: string;
    title: string;
    data?: any;
}


const ModalReviewFrom = ({ id, title, data }: ModalReviewFromProps) => {
    const { close } = useModalManager();
    const [createReview, { isLoading }] = useCreateReviewMutation();

    const methods = useForm<ReviewFormValues>({
        defaultValues: {
            fullName: '',
            comment: '',
            rating: 1,
        },
        resolver: yupResolver(ReviewSchema)
    });

    const { handleSubmit, reset } = methods;

    const onSubmit = async (data: ReviewFormValues) => {
        try {
            await createReview(data);
            reset()
            close(id)
            toast.success("Reseña enviada con éxito")
        } catch (error) {
            console.error("Error al enviar la reseña:", error);
            toast.error('Error al enviar la reseña')
        }
    }
    return (
        <Modal id={id} title={title} onClose={() => close(id)} open>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <RHFTextInput
                    id='fullName'
                    label="Nombre"
                    name='fullName'
                    placeholder="Ingresa tu nombre completo"
                />
                <RHFTextInput
                    id='comment'
                    label="Comentario"
                    name='comment'
                    placeholder="Comentario"
                />
                <RHFTextInput
                    id='rating'
                    type="number"
                    label="Calificacion"
                    name='rating'
                    placeholder="Ingrese calificacion"
                />
                <div className="mt-3">
                    <Button
                        type="submit"
                        text={isLoading ? "Enviando..." : "Enviar Reseña"}
                        disabled={isLoading}
                        variant={"primary"}
                        size={"md"}
                        width={"full"}
                        align={"center"}
                    />
                </div>
            </FormProvider>
        </Modal>
    )
}

export default ModalReviewFrom
