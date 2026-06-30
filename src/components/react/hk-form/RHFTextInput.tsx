import { Controller, useFormContext } from "react-hook-form";
import TextInput from "../form/TextInput";

interface RHFTextInputProps {
  id: string;
  label: string;
  name: string;
  placeholder: string;
  type?: string;
}

const RHFTextInput = ({
  id,
  label,
  name,
  placeholder,
  type,
}: RHFTextInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextInput
          id={id}
          label={label}
          name={name}
          placeholder={placeholder}
          type={type}
          isError={!!error}
          error={error}
          onChange={field.onChange}
          value={field.value}
        />
      )}
    />
  );
};

export default RHFTextInput;
