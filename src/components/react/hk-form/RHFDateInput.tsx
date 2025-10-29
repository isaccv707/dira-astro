import { Controller, useFormContext } from "react-hook-form";
import DateInput from "../form/DateInput";


interface RHFDateInputProps {
    id: string;
    name: string;
    label: string;
    type?: string;
}
const RHFDateInput = ({ id, label, name, type }: RHFDateInputProps) => {

    const { control } = useFormContext();
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <DateInput
                    id={id}
                    label={label}
                    name={name}
                    error={error}
                    isError={!!error}
                    onChange={field.onChange}
                    value={field.value}
                />
            )}
        />
    )
}

export default RHFDateInput
