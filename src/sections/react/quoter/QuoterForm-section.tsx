import { useForm } from "react-hook-form"
import FormProvider from "../../../components/react/hk-form/FormProvider";
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react";
import PersonalDataForm from "../forms/PersonalDataForm";
import StepIndicator from "../../../components/react/ui/StepIndicator";
import SelectStudiesSection from "../SelectStudies-section";
import { quoterFormSchema } from "../../../schemas/quoter-form/quoterFormSchema";
import * as yup from 'yup';
import { useQuoterContext } from "../../../hooks/useQuoterContext";
import { IoIosReturnLeft } from "react-icons/io";
import Button from "../../../components/react/ui/Button";

type Inputs = yup.InferType<typeof quoterFormSchema>;

const QuoterFormSection = () => {
    const [step, setStep] = useState(1);
    const { selectedStudies, addStudy, removeStudy } = useQuoterContext();

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

    const { handleSubmit, formState: { errors }, trigger } = methods;

    const onSubmit = (data: Inputs) => { };

    const nextStep = async () => {
        if (step === 1) {
            const isFormValid = await trigger(["name", "lastName", "phoneNumber", "email"]);
            if (!isFormValid) return;
            setStep((prev) => prev + 1);
        }
    };

    const previousStep = () => setStep((prev) => prev - 1)
    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-2xl w-full grid">
                <header className="bg-green-primary rounded-t-2xl p-4 text-center sticky top-0 z-10">
                    <h1 className="text-white font-bold text-lg">Cotiza tus estudios</h1>
                    <small className="text-white text-sm opacity-90">
                        Rellena la información necesaria para obtener una cotización.
                    </small>
                </header>

                <div className="flex items-center gap-4">
                    <div className="flex-1 flex justify-center">
                        <StepIndicator currentStep={step} steps={["Datos", "Estudios"]} />
                    </div>
                    {step === 2
                        ? (
                            <Button
                                text="Regresar"
                                variant={'normal'}
                                size={"sm"}
                                icon={<IoIosReturnLeft />}
                                onClick={previousStep}
                            />
                        )
                        : (null)
                    }
                </div>

                {/* {
                    step === 1 && <PersonalDataForm nextStep={nextStep} step={step} />
                } */}
                {
                    step === 1 && <SelectStudiesSection studies={selectedStudies} addStudy={addStudy} removeStudy={removeStudy} />
                }
            </div>

        </FormProvider>
    )
}

export default QuoterFormSection
