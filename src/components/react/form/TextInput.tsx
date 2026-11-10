import type { HTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";
import Label from "../ui/Label";
import { ErrorMessage } from "../ui/ErrorMessage";

interface TextInputProps {
  id: string;
  label: string;
  name: string;
  placeholder: string;
  isError?: boolean;
  error?: FieldError;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  /** e.g. "given-name", "tel", "email": lets phones autofill the field. */
  autoComplete?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  /** Short help shown under the field while there is no error. */
  hint?: string;
  /** Lets react-hook-form focus the first invalid field on submit. */
  inputRef?: React.Ref<HTMLInputElement>;
}

const TextInput = ({
  error,
  id,
  label,
  name,
  onChange,
  onBlur,
  placeholder,
  value,
  isError,
  type = "text",
  autoComplete,
  inputMode,
  hint,
  inputRef,
}: TextInputProps) => {
  const hasError = Boolean(error || isError);
  const describedBy = hasError ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className="flex w-full flex-col">
      <Label id={id} label={label} />

      <input
        ref={inputRef}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value ?? ""}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className={`mt-1 h-11 w-full rounded-clinical-sm border bg-white px-3 text-base text-ink transition-colors duration-150 placeholder:text-ink-subtle focus:outline-none focus:ring-2 sm:text-sm ${
          hasError
            ? "border-red-custom focus:ring-red-custom/30"
            : "border-ui-border hover:border-brand-ink/30 focus:border-brand-ink focus:ring-green-primary/30"
        }`}
        aria-invalid={hasError ? "true" : "false"}
        aria-describedby={describedBy}
      />

      {hasError ? (
        <div className="mt-1">
          <ErrorMessage id={`${id}-error`} error={error} />
        </div>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="mt-1 text-xs text-ink-subtle">
            {hint}
          </p>
        )
      )}
    </div>
  );
};

export default TextInput;
