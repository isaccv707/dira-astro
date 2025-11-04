import { useForm, type SubmitHandler } from "react-hook-form"
import FormProvider from "../components/react/hk-form/FormProvider";
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react";
import PersonalDataForm from "./react/forms/PersonalDataForm";
import StepIndicator from "../components/react/ui/StepIndicator";
import StudiesAndBranchForm from "./react/forms/StudiesAndBranchForm";
import { AppointmentFormSchema } from "../schemas/appointment-form/AppointmentFormSchema";

interface Option {
    label: string;
    value: string;
}

interface Inputs {
    name: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    gender: string;
    branch: string;
    studies: string[];
    date: string;
}



const AppointmentForm = () => {
    const [step, setStep] = useState(1);

    const methods = useForm<Inputs>({
        defaultValues: {
            name: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            gender: '',
            branch: '',
            studies: [],
            date: '',
        },
        resolver: yupResolver(AppointmentFormSchema)
    });

    const { handleSubmit, formState: { errors }, trigger } = methods;

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
    }

    const nextStep = async () => {
        if (step === 1) {
            const isFormValid = await trigger(["name", "lastName", "phoneNumber", "email", "gender"]);
            if (!isFormValid) return;
            console.log(step)
            setStep((prev) => prev + 1);
            console.log(step);
        }
    };

    const previousStep = () => setStep((prev) => prev - 1)

    console.log(errors);
    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-green-ligth p-2 rounded-2xl text-center">
                <h1 className="text-white font-bold text-xl">Agenda tu cita</h1>
            </div>

            <StepIndicator currentStep={step} steps={["Datos Personales", "Sucursal y estudios"]} />

            {
                step === 1 && <PersonalDataForm nextStep={nextStep} step={step} />
            }
            {
                step === 2 && <StudiesAndBranchForm onBack={previousStep} />
            }

        </FormProvider>
    )
}

export default AppointmentForm
