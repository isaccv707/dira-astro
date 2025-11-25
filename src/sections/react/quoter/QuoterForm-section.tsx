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

    const onSubmit = (data: Inputs) => {
    }

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
            <div className="bg-green-ligth p-2 rounded-2xl text-center">
                <h1 className="text-white font-bold text-xl">Cotiza tus estudios</h1>
                <p className="font-extralight text-sm text-white">Rellena la informacion necesaria para obtener una cotizacion</p>
            </div>

            <StepIndicator currentStep={step} steps={["Datos", "Estudios"]} />

            {
                step === 1 && <PersonalDataForm nextStep={nextStep} step={step} />
            }
            {
                step === 2 && <SelectStudiesSection onBack={previousStep} studies={selectedStudies} addStudy={addStudy} removeStudy={removeStudy} />
            }

        </FormProvider>
    )
}

export default QuoterFormSection
