import React from "react";
import type { FieldError } from "react-hook-form";
import Label from "../ui/Label";
import { ErrorMessage } from "../ui/ErrorMessage";

interface TextareaInputProps {
  id: string;
  label: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  rows?: number;
  error?: FieldError | undefined;
  isError?: boolean;
}

const TextareaInput = ({
  id,
  label,
  name,
  placeholder = "",
  value,
  onChange,
  rows = 5,
  error,
  isError = false,
}: TextareaInputProps) => {
  const hasError = Boolean(error || isError);
  return (
    <div className="flex w-full flex-col">
      <Label id={id} label={label} />

      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        rows={rows}
        value={value ?? ""}
        onChange={onChange}
        aria-invalid={hasError ? "true" : "false"}
        aria-describedby={hasError ? `${id}-error` : undefined}
        className={`mt-1 block w-full resize-y rounded-clinical-sm border bg-white px-3 py-2 text-base text-ink transition-colors duration-150 placeholder:text-ink-subtle focus:outline-none focus:ring-2 sm:text-sm ${
          hasError
            ? "border-red-custom focus:ring-red-custom/30"
            : "border-ui-border hover:border-brand-ink/30 focus:border-brand-ink focus:ring-green-primary/30"
        }`}
      />
      {hasError && (
        <div className="mt-1">
          <ErrorMessage id={`${id}-error`} error={error} />
        </div>
      )}
    </div>
  );
};

export default TextareaInput;
