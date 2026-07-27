import RHFTextInput from "../../../components/react/hk-form/RHFTextInput";
import RHFSelectInput from "../../../components/react/hk-form/RHFSelectInput";
import Button from "../../../components/react/buttons/Button";
import { motion, AnimatePresence } from "framer-motion";
import { useQuoterContext } from "../../../hooks/useQuoterContext";
import * as yup from "yup";
import FormProvider from "../../../components/react/hk-form/FormProvider";
import type { UseFormReturn } from "react-hook-form";
import { quoterFormSchema } from "../../../schemas/quoter-form/quoterFormSchema";

type Inputs = yup.InferType<typeof quoterFormSchema>;

interface QuotationFormProps {
  nextStep: () => Promise<void>;
  step: number;
  methods: UseFormReturn<Inputs>;
}

const QuotationForm = ({ nextStep, methods }: QuotationFormProps) => {
  const { setClient } = useQuoterContext();
  const { watch, handleSubmit } = methods;

  const clientType = watch("clientType");

  const handleNext = () => {
    const values: Inputs = {
      clientType: watch("clientType"),
      name: watch("name"),
      lastName: watch("lastName"),
      phoneNumber: watch("phoneNumber"),
      email: watch("email"),
      companyRFC: watch("companyRFC"),
    };
    setClient(values);
    nextStep();
  };

  const onSubmit = (_data: Inputs) => {};

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full px-4 py-5 sm:px-6 sm:py-6 md:py-8">
        <div className="mx-auto w-full max-w-2xl">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-5">
            {/* Tipo de cliente */}
            <RHFSelectInput
              id="clientType"
              name="clientType"
              label="Tipo de cliente"
              placeholder="Selecciona una opción"
              options={[
                { label: "Particular", value: "particular" },
                { label: "Empresa", value: "company" },
              ]}
            />

            {/* Nombre / Razón social */}
            <RHFTextInput
              id="name"
              name="name"
              label={clientType === "company" ? "Razón social" : "Nombre"}
              placeholder={
                clientType === "company"
                  ? "Ingresa la razón social"
                  : "Ingresa tu nombre"
              }
            />

            {/* Apellidos / RFC — evita "brinco" al animar cambiando de campo */}
            <div className="min-h-23">
              <AnimatePresence mode="wait">
                {clientType === "particular" ? (
                  <motion.div
                    key="lastName"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <RHFTextInput
                      id="lastName"
                      name="lastName"
                      label="Apellidos"
                      placeholder="Ingresa tu apellidos"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="companyRFC"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <RHFTextInput
                      id="companyRFC"
                      name="companyRFC"
                      label="RFC de la empresa"
                      placeholder="Ej. ABC123456XYZ"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Teléfono */}
            <RHFTextInput
              id="phoneNumber"
              name="phoneNumber"
              label="Teléfono"
              placeholder="Ej. 3312345678"
            />

            {/* Correo electrónico */}
            <div className="sm:col-span-2">
              <RHFTextInput
                id="email"
                name="email"
                label="Correo electrónico"
                placeholder="correo@dominio.com"
              />
            </div>

            {/* Botón */}
            <div className="sm:col-span-2 mt-2 border-t border-ui-border pt-5">
              <div className="flex flex-col-reverse items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-grey-custom leading-relaxed">
                  Usaremos estos datos únicamente para enviarte la
                  cotización.
                </p>
                <Button
                  text="Siguiente"
                  type="button"
                  variant="secondary"
                  size="lg"
                  width="full"
                  className="sm:w-auto"
                  onClick={handleNext}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default QuotationForm;
