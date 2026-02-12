import { useState } from "react";
import { useForm } from "react-hook-form"

import QuotationForm from "./QuoterForm-section";
import QuoterSelectStudies from "./QuoterSelectStudies-section";

import StepIndicator from "../../../components/react/ui/StepIndicator";
import Button from "../../../components/react/ui/Button";

import { quoterFormSchema } from "../../../schemas/quoter-form/quoterFormSchema";

import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import { IoIosReturnLeft } from "react-icons/io";


type Inputs = yup.InferType<typeof quoterFormSchema>;

const Quoter = () => {
    const [step, setStep] = useState(1);

    const methods = useForm<Inputs>({
        defaultValues: {
            clientType: 'particular',
            name: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            companyRFC: '',
        },
        resolver: yupResolver(quoterFormSchema) as any
    });

    const { trigger } = methods;

    const nextStep = async () => {
        if (step === 1) {
            const isFormValid = await trigger(["name", "lastName", "phoneNumber", "email"]);
            if (!isFormValid) return;
            setStep((prev) => prev + 1);
        }
    };

    const previousStep = () => setStep((prev) => prev - 1)
    return (
        <div className="rounded-2xl w-full grid">
            <header className="bg-green-primary rounded-t-2xl p-4 text-center sticky top-0 z-10">
                <h1 className="text-white font-bold text-lg">Cotiza tus estudios</h1>
                <small className="text-white text-sm opacity-90">
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
                            icon={<IoIosReturnLeft />}
                            onClick={previousStep}
                        />
                    </div>
                ) : null}
            </div>

            {/* DESKTOP */}
            <div className="hidden sm:flex relative items-center px-4 sm:px-6 mt-10">
                <div className="absolute left-1/2 -translate-x-1/2">
                    <StepIndicator currentStep={step} steps={["Datos", "Estudios"]} />
                </div>

                <div className="ml-auto pr-2 sm:pr-4">
                    {step === 2 ? (
                        <Button
                            text="Regresar"
                            variant="primary"
                            size="sm"
                            icon={<IoIosReturnLeft />}
                            onClick={previousStep}
                        />
                    ) : null}
                </div>
            </div>
            {
                step === 1 && <QuotationForm methods={methods} nextStep={nextStep} step={step} />
            }
            {
                step === 2 && <QuoterSelectStudies />
            }
        </div>
    )
}

export default Quoter
