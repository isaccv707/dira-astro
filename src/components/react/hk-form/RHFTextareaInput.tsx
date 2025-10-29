import { Controller, useFormContext } from "react-hook-form"
import TextareaInput from "../form/TextareaInput";

interface RHFTextareaProps {
    id: string;
    name: string;
    label: string;
}

const RHFTextareaInput = ({ id, label, name }: RHFTextareaProps) => {
    const { control } = useFormContext();
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <TextareaInput
                    id={id}
                    name={name}
                    label={label}
                    value={field.value}
                    onChange={field.onChange}
                    error={error}
                    
                />
            )}
        />
    )
}

export default RHFTextareaInput
