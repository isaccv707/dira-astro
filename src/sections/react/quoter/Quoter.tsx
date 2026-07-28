import { useState } from "react";
import { useForm } from "react-hook-form";

import QuotationForm from "./QuoterForm";
import QuoterSelectStudies from "./QuoterSelectStudies";

import StepIndicator from "../../../components/react/ui/StepIndicator";
import Button from "../../../components/react/buttons/Button";
import { ClipboardList } from "lucide-react";

import { quoterFormSchema } from "../../../schemas/quoter-form/quoterFormSchema";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type Inputs = yup.InferType<typeof quoterFormSchema>;

const Quoter = () => {
  const [step, setStep] = useState(1);

  const methods = useForm<Inputs>({
    defaultValues: {
      clientType: "particular",
      name: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      companyRFC: "",
    },
    resolver: yupResolver(quoterFormSchema) as any,
  });

  const { trigger } = methods;

  const nextStep = async () => {
    if (step === 1) {
      const isFormValid = await trigger([
        "name",
        "lastName",
        "phoneNumber",
        "email",
      ]);
      if (!isFormValid) return;
      setStep((prev) => prev + 1);
    }
  };

  const previousStep = () => setStep((prev) => prev - 1);
  return (
    <div className="rounded-clinical-lg w-full grid">
      <header className="bg-green-primary rounded-t-clinical-lg px-4 py-4 sm:px-6 text-center sticky top-0 z-10">
        <div className="flex items-center justify-center gap-2">
          <ClipboardList className="h-5 w-5 text-white/90" strokeWidth={2} />
          <h1 className="text-white font-bold text-base sm:text-lg">
            Cotiza tus estudios
          </h1>
        </div>
        <small className="text-white text-xs sm:text-sm opacity-90">
          Rellena la información necesaria para obtener una cotización.
        </small>
      </header>

      {/* MOBILE */}
      <div className="sm:hidden px-4">
        <div className="flex justify-center">
          <StepIndicator currentStep={step} steps={["Datos", "Estudios"]} />
        </div>

        {step === 2 ? (
          <div className="mt-3 flex justify-end pr-1">
            <Button
              text="Regresar"
              variant="primary"
              size="sm"
              icon={"tabler:arrow-back"}
              onClick={previousStep}
            />
          </div>
        ) : null}
      </div>

      {/* DESKTOP */}
      <div className="hidden sm:flex relative items-center px-4 sm:px-6 mt-6 sm:mt-8">
        <div className="absolute left-1/2 -translate-x-1/2">
          <StepIndicator currentStep={step} steps={["Datos", "Estudios"]} />
        </div>

        <div className="ml-auto pr-2 sm:pr-4">
          {step === 2 ? (
            <Button
              text="Regresar"
              variant="primary"
              size="sm"
              icon={"tabler:arrow-back"}
              onClick={previousStep}
            />
          ) : null}
        </div>
      </div>
      {step === 1 && (
        <QuotationForm methods={methods} nextStep={nextStep} step={step} />
      )}
      {step === 2 && <QuoterSelectStudies />}
    </div>
  );
};

export default Quoter;
