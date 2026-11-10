import type { HTMLAttributes } from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextInput from "../form/TextInput";

interface RHFTextInputProps {
  id: string;
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  hint?: string;
}

const RHFTextInput = ({
  id,
  label,
  name,
  placeholder,
  type,
  autoComplete,
  inputMode,
  hint,
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
          onBlur={field.onBlur}
          inputRef={field.ref}
          value={field.value}
          autoComplete={autoComplete}
          inputMode={inputMode}
          hint={hint}
        />
      )}
    />
  );
};

export default RHFTextInput;
