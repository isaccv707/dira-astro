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
      <div className="w-full px-4 sm:px-6">
        <div className="mx-auto w-full max-w-3xl">
          {/* Card */}
          <div className=" p-5 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-start">
              {/* Tipo de cliente */}
              <div className="md:col-span-12">
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
              </div>

              {/* Identidad: Nombre + Apellido/RFC */}
              <div className="md:col-span-7">
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
              </div>

              <div className="md:col-span-5">
                {/* Evita “brinco” al animar cambiando de campo */}
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
              </div>

              {/* Contacto: Teléfono + Email */}
              <div className="md:col-span-5">
                <RHFTextInput
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Teléfono"
                  placeholder="Ej. 3312345678"
                />
              </div>

              <div className="md:col-span-7">
                <RHFTextInput
                  id="email"
                  name="email"
                  label="Correo electrónico"
                  placeholder="correo@dominio.com"
                />
              </div>

              {/* Botón */}
              <div className="md:col-span-12 pt-2">
                <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
                  <Button
                    text="Siguiente"
                    type="button"
                    variant="secondary"
                    size="lg"
                    onClick={handleNext}
                  />
                </div>

                {/* Tip opcional: microcopy */}
                <p className="mt-3 text-xs text-black/50">
                  Usaremos estos datos únicamente para enviarte la cotización.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default QuotationForm;
