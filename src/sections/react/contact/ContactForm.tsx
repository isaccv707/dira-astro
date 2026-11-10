import { useEffect, useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CheckCircle2, MapPin } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  contactFormSchema,
  type ContactFormValues,
} from "../../../schemas/contact-form/ContactFormSchema";
import { sendContactMessage } from "../../../api/contactApi/contactApi";
import { resolveBranchId } from "../../../stores/branchStore";
import { Buttonstyles } from "../../../styles/buttonsStyles";
import FormProvider from "../../../components/react/hk-form/FormProvider";
import RHFTextInput from "../../../components/react/hk-form/RHFTextInput";
import RHFSelectInput from "../../../components/react/hk-form/RHFSelectInput";
import RHFTextareaInput from "../../../components/react/hk-form/RHFTextareaInput";
import Button from "../../../components/react/buttons/Button";

interface ContactFormProps {
  /** Branch resolved on the server (cookie or default); the message goes to it. */
  branchId?: string;
  branchName?: string;
}

const OPTIONS = [
  { value: "", label: "Selecciona un asunto" },
  { value: "CLINICAL_ANALYSIS", label: "Análisis clínicos" },
  { value: "CORPORATE_HEALTH", label: "Salud empresarial" },
  { value: "HOME_SAMPLING", label: "Tomas a domicilio" },
  { value: "OTHER", label: "Otro" },
];

const DEFAULT_VALUES: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  subject: "" as ContactFormValues["subject"],
  message: "",
  privacyAccepted: false as true,
  website: "",
};

export const ContactForm = ({ branchId, branchName }: ContactFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sentFolio, setSentFolio] = useState<number | null | undefined>(undefined);
  const successRef = useRef<HTMLDivElement>(null);

  // The success panel is shorter than the form: bring it into view and move
  // focus there so screen readers announce it.
  useEffect(() => {
    if (sentFolio === undefined || !successRef.current) return;
    successRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
    successRef.current.focus({ preventScroll: true });
  }, [sentFolio]);

  const methods = useForm<ContactFormValues>({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(contactFormSchema),
  });
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    const targetBranchId = branchId ?? resolveBranchId();
    if (!targetBranchId) {
      toast.error("Elige una sucursal para enviar tu mensaje.");
      return;
    }
    setIsLoading(true);
    try {
      const result = await sendContactMessage({ ...data, branchId: targetBranchId });
      reset(DEFAULT_VALUES);
      setSentFolio(result.folio ?? null);
    } catch (error) {
      toast.error(
        (error as Error).message ||
          "No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos por WhatsApp.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (sentFolio !== undefined) {
    return (
      <div
        ref={successRef}
        role="status"
        tabIndex={-1}
        className="rounded-clinical-md focus:outline-none border border-ui-border bg-white p-6 shadow-xs sm:p-8"
      >
        <CheckCircle2 aria-hidden="true" className="h-8 w-8 text-brand-ink" />
        <h2 className="mt-4 text-lg font-bold tracking-tight text-ink sm:text-xl">
          Recibimos tu mensaje
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          {branchName ? `El equipo de ${branchName}` : "Nuestro equipo"} te responderá al
          correo o teléfono que nos dejaste.
        </p>
        {sentFolio !== null && (
          <p className="mt-4 text-sm text-ink-muted">
            Tu folio es{" "}
            <span className="rounded-clinical-sm border border-ui-border bg-ui-bg px-2 py-0.5 font-mono font-medium text-ink">
              #{sentFolio}
            </span>
          </p>
        )}
        <button
          type="button"
          onClick={() => setSentFolio(undefined)}
          className={`${Buttonstyles({ variant: "outline", size: "md" })} mt-6`}
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
      <div className="w-full overflow-hidden rounded-clinical-md border border-ui-border bg-white shadow-xs">
        <div className="border-b border-ui-border px-4 py-4 sm:px-6">
          <h2 className="text-lg font-bold tracking-tight text-ink sm:text-xl">
            Envíanos un mensaje
          </h2>
          <p className="mt-1 text-sm text-ink-muted">
            Te responderemos al correo o teléfono que nos dejes.
          </p>
          {branchName && (
            <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-subtle">
              <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-brand-ink" />
              Lo recibe la sucursal <span className="font-semibold text-ink">{branchName}</span>
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:gap-5 sm:p-6">
          <RHFTextInput
            id="name"
            name="name"
            label="Nombre"
            placeholder="Tu nombre"
            type="text"
            autoComplete="name"
          />

          <RHFTextInput
            id="email"
            name="email"
            label="Correo electrónico"
            placeholder="correo@dominio.com"
            type="email"
            autoComplete="email"
            inputMode="email"
          />

          <RHFTextInput
            id="phone"
            name="phone"
            label="Teléfono"
            placeholder="Ej. 33 1234 5678"
            type="tel"
            autoComplete="tel-national"
            inputMode="tel"
          />

          <RHFSelectInput
            id="subject"
            label="Asunto"
            name="subject"
            placeholder="Asunto"
            options={OPTIONS}
          />

          <div className="sm:col-span-2">
            <RHFTextareaInput id="message" label="Mensaje" name="message" />
          </div>

          {/* Honeypot: off-screen and out of the tab order; people never fill it. */}
          <div aria-hidden="true" className="absolute -left-full h-px w-px overflow-hidden">
            <label htmlFor="website">No llenar este campo</label>
            <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="privacyAccepted" className="flex items-start gap-3 text-sm text-ink-muted">
              <input
                id="privacyAccepted"
                type="checkbox"
                aria-invalid={!!errors.privacyAccepted}
                aria-describedby={errors.privacyAccepted ? "privacyAccepted-error" : undefined}
                className="mt-0.5 h-5 w-5 shrink-0 rounded-sm border-ui-border accent-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary focus-visible:ring-offset-2"
                {...register("privacyAccepted")}
              />
              <span>
                Acepto el{" "}
                <a
                  href="/aviso-de-privacidad.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-ink underline-offset-4 hover:underline"
                >
                  aviso de privacidad
                </a>{" "}
                y que DYRA use mis datos para responder este mensaje.
              </span>
            </label>
            {errors.privacyAccepted && (
              <p id="privacyAccepted-error" className="mt-1.5 text-xs text-red-custom">
                {errors.privacyAccepted.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              width="full"
              text="Enviar mensaje"
              isLoading={isLoading}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </FormProvider>
  );
};
