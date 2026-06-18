import { useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import emailjs from "@emailjs/browser";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { contactFormSchema } from "../../../schemas/contact-form/ContactFormSchema";
import { publicKey, serviceId, templateId } from "../../../constants/emailJs";
import FormProvider from "../../../components/react/hk-form/FormProvider";
import RHFTextInput from "../../../components/react/hk-form/RHFTextInput";
import RHFSelectInput from "../../../components/react/hk-form/RHFSelectInput";
import RHFTextareaInput from "../../../components/react/hk-form/RHFTextareaInput";

interface Inputs {
  name: string;
  email: string;
  phone: string;
  affair: string;
  message: string;
}

const OPTIONS = [
  { value: "Asunto", label: "Asunto" },
  { value: "Analisis Clinicos", label: "Analisis Clinicos" },
  { value: "Salud Empresarial", label: "Salud Empresarial" },
  { value: "Tomas a Domicilio", label: "Tomas a Domicilio" },
];

export const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<Inputs>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      affair: "Asunto",
      message: "",
    },
    resolver: yupResolver(contactFormSchema),
  });

  const { handleSubmit, reset } = methods;

  const form = useRef<HTMLFormElement>(null);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (form.current) {
      setIsLoading(true);
      emailjs
        .sendForm(serviceId, templateId, form.current, publicKey)
        .then(() => {
          toast.success("Email enviado correctamente");
          reset();
          setIsLoading(false);
        })
        .catch(() => {
          toast.error("Error al enviar el email");
          setIsLoading(false);
        });
    }
  };

  return (
    <FormProvider
      ref={form}
      onSubmit={handleSubmit(onSubmit)}
      methods={methods}
    >
      <div className="w-full rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-primary/10 px-4 py-3 sm:px-6">
          <p className="text-xs font-semibold tracking-[2px] uppercase text-green-secondary">
            Envíanos un mensaje
          </p>
          <h1 className="mt-1 text-lg sm:text-xl font-extrabold text-green-secondary">
            Formulario de contacto
          </h1>
          <p className="mt-1 text-sm text-grey">
            Compártenos tus datos y te contactaremos lo antes posible.
          </p>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:gap-5 sm:p-6">
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
            <RHFTextareaInput id="message" label="Mensaje" name="message" />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="
                w-full h-11 rounded-xl
                bg-green-light text-white font-semibold
                hover:bg-green-primary active:bg-green-primary/90
                transition
                disabled:opacity-60 disabled:cursor-not-allowed
                shadow-sm
              "
            >
              {isLoading ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};
