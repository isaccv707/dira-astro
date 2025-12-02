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
}

const TextInput = ({
    error,
    id,
    label,
    name,
    onChange,
    placeholder,
    value,
    isError,
    type = "text",
}: TextInputProps) => {
    const hasError = Boolean(error || isError);

    return (
        <div className="w-full flex flex-col">
            <Label id={id} label={label} />

            <input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`
          mt-1 w-full rounded-md border px-4 py-2 text-sm
          placeholder:text-gray-400
          transition focus:outline-none focus:ring-2
          ${hasError
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-green-400 focus:ring-green-400"
                    }
        `}
                aria-invalid={hasError ? "true" : "false"}
                aria-describedby={hasError ? `${id}-error` : undefined}
            />

            {hasError && (
                <div className="mt-1">
                    <ErrorMessage id={`${id}-error`} error={error} />
                </div>
            )}
        </div>
    );
};

export default TextInput;
