import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useStore } from "@nanostores/react";
import { ArrowLeft, CheckCircle2, Download, ExternalLink } from "lucide-react";
import clsx from "clsx";
import type * as yup from "yup";

import FormProvider from "../../../components/react/hk-form/FormProvider";
import RHFTextInput from "../../../components/react/hk-form/RHFTextInput";
import { Buttonstyles } from "../../../styles/buttonsStyles";
import { quoterFormSchema } from "../../../schemas/quoter-form/quoterFormSchema";
import useQuotationPdf from "../../../hooks/useQuotationPdf";
import type { Client } from "../../../interfaces/client.interface";
import {
  clearStudies,
  clientStore,
  selectedServiceStore,
  selectedStudiesStore,
  setClient,
} from "../../../stores/quoterStore";

type Inputs = yup.InferType<typeof quoterFormSchema>;

interface QuoterFormProps {
  onBack: () => void;
  /** Called after "Nueva cotización" so the quoter returns to step 1. */
  onRestart: () => void;
}

const CLIENT_TYPES = [
  { value: "particular", label: "Particular" },
  { value: "company", label: "Empresa" },
] as const;

/** Step 2: who the quote is for, then download or view the PDF. */
const QuoterForm = ({ onBack, onRestart }: QuoterFormProps) => {
  const savedClient = useStore(clientStore);
  const selectedStudies = useStore(selectedStudiesStore);
  const selectedService = useStore(selectedServiceStore);
  const [done, setDone] = useState(false);

  const methods = useForm<Inputs>({
    defaultValues: {
      clientType: savedClient?.clientType ?? "particular",
      name: savedClient?.name ?? "",
      lastName: savedClient?.lastName ?? "",
      phoneNumber: savedClient?.phoneNumber ?? "",
      email: savedClient?.email ?? "",
      companyRFC: savedClient?.companyRFC ?? "",
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(quoterFormSchema) as any,
  });
  const { control, handleSubmit, watch } = methods;
  const isCompany = watch("clientType") === "company";

  const { downloadQuotation, viewQuotation, isDownloading, isViewing, isBusy } =
    useQuotationPdf({ selectedStudies, selectedService });

  // Cleaned values (trimmed, phone digits only); companies carry no last name.
  const toClient = (values: Inputs): Client => {
    const cleaned = quoterFormSchema.cast(values);
    const client: Client = {
      clientType: cleaned.clientType as Client["clientType"],
      name: cleaned.name,
      lastName: cleaned.clientType === "company" ? "" : (cleaned.lastName ?? ""),
      phoneNumber: cleaned.phoneNumber,
      email: cleaned.email || undefined,
      companyRFC: cleaned.companyRFC ?? undefined,
    };
    setClient(client);
    return client;
  };

  const onDownload = handleSubmit(async (values) => {
    if (await downloadQuotation(toClient(values))) setDone(true);
  });
  const onView = () => {
    const tab = window.open("", "_blank");
    handleSubmit(
      async (values) => {
        await viewQuotation(toClient(values), tab);
      },
      () => tab?.close(),
    )();
  };

  if (done) {
    return (
      <div className="flex flex-col items-center px-4 py-12 text-center">
        <CheckCircle2 aria-hidden="true" className="h-10 w-10 text-brand-ink" />
        <h2 className="mt-4 text-xl font-bold text-ink">Cotización descargada</h2>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-muted">
          Revisa tu carpeta de descargas. Puedes presentar el PDF en sucursal
          o volver a descargarlo con los mismos datos.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => setDone(false)}
            className={Buttonstyles({ variant: "outline", size: "md" })}
          >
            Volver a la cotización
          </button>
          <button
            type="button"
            onClick={() => {
              clearStudies();
              onRestart();
            }}
            className={Buttonstyles({ variant: "primary", size: "md" })}
          >
            Nueva cotización
          </button>
        </div>
      </div>
    );
  }

  return (
    <FormProvider methods={methods} onSubmit={onDownload}>
      <div className="space-y-6">
        <button
          type="button"
          onClick={onBack}
          className={clsx(Buttonstyles({ variant: "text", size: "none" }), "text-sm")}
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Cambiar estudios
        </button>

        <Controller
          control={control}
          name="clientType"
          render={({ field }) => (
            <fieldset>
              <legend className="font-semibold text-ink">La cotización es para</legend>
              <div className="mt-2 inline-flex rounded-clinical-sm border border-ui-border bg-ui-bg p-1">
                {CLIENT_TYPES.map((option) => (
                  <label
                    key={option.value}
                    className={clsx(
                      "cursor-pointer rounded-clinical-sm px-4 py-2 text-sm font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-green-primary",
                      field.value === option.value
                        ? "bg-white text-ink shadow-xs"
                        : "text-ink-muted hover:text-ink",
                    )}
                  >
                    <input
                      type="radio"
                      name={field.name}
                      value={option.value}
                      checked={field.value === option.value}
                      onChange={() => field.onChange(option.value)}
                      className="sr-only"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </fieldset>
          )}
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <RHFTextInput
            id="name"
            name="name"
            label={isCompany ? "Razón social" : "Nombre"}
            placeholder={isCompany ? "Ej. Constructora del Bajío" : "Ej. María"}
            autoComplete={isCompany ? "organization" : "given-name"}
          />
          {isCompany ? (
            <RHFTextInput
              id="companyRFC"
              name="companyRFC"
              label="RFC (opcional)"
              placeholder="Ej. ABC123456XYZ"
              autoComplete="off"
            />
          ) : (
            <RHFTextInput
              id="lastName"
              name="lastName"
              label="Apellidos"
              placeholder="Ej. López García"
              autoComplete="family-name"
            />
          )}
          <RHFTextInput
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            label="Teléfono"
            placeholder="Ej. 33 1234 5678"
            autoComplete="tel-national"
            inputMode="tel"
            hint="10 dígitos"
          />
          <RHFTextInput
            id="email"
            name="email"
            type="email"
            label="Correo electrónico (opcional)"
            placeholder="correo@dominio.com"
            autoComplete="email"
            inputMode="email"
          />
        </div>

        <div className="border-t border-ui-border pt-5">
          <div className="flex flex-col gap-3 sm:flex-row-reverse sm:justify-start">
            <button
              type="submit"
              disabled={isBusy || selectedStudies.length === 0}
              className={Buttonstyles({ variant: "accent", size: "lg" })}
            >
              <Download aria-hidden="true" className="h-4 w-4" />
              {isDownloading ? "Generando PDF…" : "Descargar cotización (PDF)"}
            </button>
            <button
              type="button"
              onClick={onView}
              disabled={isBusy || selectedStudies.length === 0}
              className={Buttonstyles({ variant: "outline", size: "lg" })}
            >
              <ExternalLink aria-hidden="true" className="h-4 w-4" />
              {isViewing ? "Generando…" : "Ver en el navegador"}
            </button>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-ink-subtle">
            Usamos tus datos solo para generar la cotización. Consulta el{" "}
            <a
              href="/aviso-de-privacidad.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-ink underline-offset-4 hover:underline"
            >
              aviso de privacidad
            </a>
            .
          </p>
        </div>
      </div>
    </FormProvider>
  );
};

export default QuoterForm;
