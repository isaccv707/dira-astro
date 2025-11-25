import { useForm, type SubmitHandler } from "react-hook-form";
import { useRef, useState } from "react";
import FormProvider from "../../components/react/hk-form/FormProvider";
import RHFTextInput from "../../components/react/hk-form/RHFTextInput";
import RHFSelectInput from "../../components/react/hk-form/RHFSelectInput";
import RHFTextareaInput from "../../components/react/hk-form/RHFTextareaInput";
import Button from "../../components/react/ui/Button";

interface Inputs {
    name: string;
    email: string;
    phone: string;
    affair: { label: string, value: string };
    message: string;
}

declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
    }
}

const OPTIONS = [
    { value: 'Asunto', label: 'Asunto' },
    { value: 'Fase Preanalítica', label: 'Fase Preanalítica' },
    { value: 'Fase Analítica', label: 'Fase Analítica' },
    { value: 'Insumos', label: 'Insumos' },
    { value: 'Pruebas Rápidas', label: 'Pruebas Rápidas' },
    { value: 'Serología Látex', label: 'Serología Látex' },
    { value: 'Soportes de Laboratorio', label: 'Soportes de Laboratorio' },
    { value: 'Equipos y Reactivos Analíticos', label: 'Equipos y Reactivos Analíticos' },
    { value: 'Pruebas Rápidas', label: 'Pruebas Rápidas' },
    { value: 'Cogniti', label: 'Cogniti' },
]

export const ContactForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const methods = useForm<Inputs>({
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            affair: { label: '', value: '' },
            message: '',
        },
        // resolver: yupResolver(formSchema),
    });

    const { handleSubmit, reset } = methods;
    const form = useRef<HTMLFormElement>(null);
    const serviceId = 'service_q91aqaa';
    const templateId = 'template_12al4eg';
    const publicKey = '_Dj3Kqn5tutHoylM8';

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        // if (form.current) {
        //     setIsLoading(true);
        //     emailjs.sendForm(serviceId, templateId, form.current, publicKey)
        //         .then(() => {
        //             toast.success('Email enviado correctamente');
        //             reset();
        //             setIsLoading(false);
        //         })
        //         .catch(() => {
        //             toast.error('Error al enviar el email');
        //             setIsLoading(false);
        //         });
        // }
    };

    return (
        <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
            <div className="bg-primary p-2 rounded-2xl text-center">
                <h1 className="text-white font-bold text-xl">Formulario de contacto</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 w-full">

                <RHFTextInput
                    id="name"
                    name="name"
                    label="Nombre"
                    placeholder="Ingresa tu nombre"
                    type="text"
                />

                <RHFTextInput
                    id="email"
                    name="email"
                    label="Email"
                    placeholder="Ingresa tu email"
                    type="text"
                />

                <RHFTextInput
                    id="phone"
                    name="phone"
                    label="Número de teléfono"
                    placeholder="Ingresa tu número de teléfono"
                    type="text"
                />

                <RHFSelectInput
                    id="affair"
                    label="Asunto"
                    name="affair"
                    placeholder="Asunto"
                    options={OPTIONS}
                />

                <div className="sm:col-span-2">
                    <RHFTextareaInput
                        id="message"
                        label="Mensaje"
                        name="message"
                    />
                </div>

                <div className="sm:col-span-2 flex justify-center">
                    <Button
                        text="Enviar"
                        type="submit"
                        variant={"submit"}
                        size={"md"}
                    />
                </div>
            </div>
        </FormProvider>
    );
};

