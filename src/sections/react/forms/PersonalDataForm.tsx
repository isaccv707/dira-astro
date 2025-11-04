
import RHFTextInput from '../../../components/react/hk-form/RHFTextInput'
import RHFSelectInput from '../../../components/react/hk-form/RHFSelectInput'
import RHFDateInput from '../../../components/react/hk-form/RHFDateInput'
import Button from '../../../components/react/ui/Button'


interface PersonalDataFormProps {
    nextStep: () => Promise<void>
    step: number
}
const PersonalDataForm = ({ nextStep }: PersonalDataFormProps) => {
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 w-full">
                <RHFTextInput
                    id="name"
                    name="name"
                    label="Nombre"
                    placeholder="Ingresa tu nombre"
                />
                <RHFTextInput
                    id="lastName"
                    name="lastName"
                    label="Apellido"
                    placeholder="Ingresa tu apellido"
                />
                <RHFTextInput
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Telefono"
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

            </div>
            <div className="w-full flex justify-start mt-3">
                <Button
                    text="Siguiente"
                    type="button"
                    variant={"submit"}
                    size={"md"}
                    onClick={nextStep}
                />
            </div>
        </div>
    )
}

export default PersonalDataForm
