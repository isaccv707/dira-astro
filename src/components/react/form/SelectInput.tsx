import React from "react";
import type { FieldError } from "react-hook-form";
import Label from "../ui/Label";
import { ErrorMessage } from "../ui/ErrorMessage";

export interface Options {
  value: string;
  label: string;
}

interface SelectInputProps {
  id: string;
  label: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  name: string;
  placeholder?: string;
  options: Options[];
  value?: string;
  error?: FieldError | undefined;
  isError?: boolean;
}

const SelectInput = ({
  id,
  label,
  name,
  options,
  onChange,
  value,
  error,
  isError,
}: SelectInputProps) => {
  const hasError = Boolean(error || isError);
  return (
    <div className="flex w-full flex-col">
      <Label id={id} label={label} />
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`mt-1 h-11 w-full rounded-clinical-sm border bg-white px-3 text-base text-ink transition-colors duration-150 focus:outline-none focus:ring-2 sm:text-sm ${
          hasError
            ? "border-red-custom focus:ring-red-custom/30"
            : "border-ui-border hover:border-brand-ink/30 focus:border-brand-ink focus:ring-green-primary/30"
        }`}
        aria-invalid={hasError ? "true" : "false"}
        aria-describedby={hasError ? `${id}-error` : undefined}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.value === "Asunto"}>
            {option.label}
          </option>
        ))}
      </select>
      {hasError && (
        <div className="mt-1">
          <ErrorMessage id={`${id}-error`} error={error} />
        </div>
      )}
    </div>
  );
};

export default SelectInput;
