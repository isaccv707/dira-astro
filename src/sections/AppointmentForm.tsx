import { useForm, type SubmitHandler } from "react-hook-form"
import FormProvider from "../components/react/hk-form/FormProvider";
import RHFTextInput from "../components/react/hk-form/RHFTextInput";
import RHFSelectInput from "../components/react/hk-form/RHFSelectInput";
import RHFDateInput from "../components/react/hk-form/RHFDateInput";
import Button from "../components/react/ui/Button";
interface Inputs {
    name: string;
    lastName: string;
    gender: { label: string, value: string }[];
    schedule: { label: string, value: string }[];
    phoneNumber: string;
    email: string;
    date: string
}
const AppointmentForm = () => {
    const methods = useForm<Inputs>({
        defaultValues: {
            name: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            gender: [
                { label: 'Mujer', value: 'Mujer' },
                { label: 'Hombre', value: 'Hombre' }
            ],
            schedule: [
                {label: 'Colima', value: 'Colima'},
                {label: 'Guadalajara', value: 'Guadalajara'},
            ],
            date: '',
        }
    });
    const { handleSubmit } = methods;

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
    }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-green-ligth p-2 rounded-2xl text-center">
                <h1 className="text-white font-bold text-xl">Agenda tu cita</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 w-full">
                <RHFTextInput
                    id="name"
                    name="name"
                    label="Nombre"
                    placeholder="Ingresa tu nombre"
                />
                <RHFTextInput
                    id="lastname"
                    name="lastname"
                    label="Apellido"
                    placeholder="Ingresa tu apellido"
                />
                <RHFTextInput
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Numero"
                    placeholder="Ingresa tu numero de telefono"
                />
                <RHFTextInput
                    id="email"
                    name="email"
                    label="Email"
                    placeholder="Ingresa tu email"
                />
                <RHFSelectInput
                    id="gender"
                    label="Genero"
                    name="gender"
                    options={[
                        { label: 'Mujer', value: 'Mujer' },
                        { label: 'Hombre', value: 'Hombre' }
                    ]}
                    placeholder="Ingresa tu genero"
                />
                <RHFSelectInput
                    id="gender"
                    label="Sucursal"
                    name="gender"
                    options={[
                        { label: 'Mujer', value: 'Mujer' },
                        { label: 'Hombre', value: 'Hombre' }
                    ]}
                    placeholder="Ingresa tu genero"
                />

                <RHFDateInput
                    id={'date'}
                    label="Fecha de cita"
                    name="date"
                />
            </div>
            <div className="w-full flex justify-start mt-3">
                <Button
                    text="Enviar"
                    type="submit"
                    variant={"submit"}
                    size={"md"}
                />
            </div>
        </FormProvider>
    )
}

export default AppointmentForm
