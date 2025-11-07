
import RHFTextInput from '../../../components/react/hk-form/RHFTextInput'
import RHFSelectInput from '../../../components/react/hk-form/RHFSelectInput'
import RHFDateInput from '../../../components/react/hk-form/RHFDateInput'
import Button from '../../../components/react/ui/Button'
import { useQuoterContext } from '../../../contexts/QuoterContext'
import { useFormContext } from 'react-hook-form'


interface PersonalDataFormProps {
    nextStep: () => Promise<void>
    step: number
}
const PersonalDataForm = ({ nextStep }: PersonalDataFormProps) => {
    const { client, setClient } = useQuoterContext();
    const { watch } = useFormContext();


    const handleNext = () => {
        const values = {
            clientType: watch("clientType"),
            name: watch("name"),
            lastName: watch("lastName"),
            phoneNumber: watch("phoneNumber"),
            email: watch("email")
        }
        setClient(values);
        nextStep();
    }

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 w-full">
                <RHFSelectInput
                    id="clientType"
                    name="clientType"
                    label="Tipo de cliente"
                    placeholder='Tipo de cliente'
                    options={[
                        { label: 'Particular', value: 'particular' },
                        { label: 'Empresa', value: 'company' },
                    ]}
                />
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

            </div>
            <div className="w-full flex justify-start mt-3">
                <Button
                    text="Siguiente"
                    type="button"
                    variant={"submit"}
                    size={"md"}
                    onClick={handleNext}
                />
            </div>
        </div>
    )
}

export default PersonalDataForm
