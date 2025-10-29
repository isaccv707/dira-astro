import { Controller, useFormContext } from "react-hook-form"
import SelectInput, { type Options } from "../form/SelectInput";


interface RHFSelectInputProps {
    id: string;
    name: string;
    label: string;
    placeholder: string;
    type?: string;
    options: Options[];
}

const RHFSelectInput = ({ id, label, name, placeholder, options }: RHFSelectInputProps) => {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <SelectInput
                    id={id}
                    name={name}
                    label={label}
                    error={error}
                    placeholder={placeholder}
                    onChange={field.onChange}
                    value={field.value}
                    options={options}
                    isError={!!error}
                />
            )}
        />
    )
}

export default RHFSelectInput
