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
    return (
        <div className="w-full flex flex-col">
            <Label
                id={id}
                label={label}
            />
            <input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`
          border rounded-md px-4 py-2
          focus:outline-none focus:ring-2 focus:ring-primary
          transition
          ${isError || error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
          placeholder-gray-400
          disabled:bg-gray-100 disabled:cursor-not-allowed
        `}
                aria-invalid={isError || error ? "true" : "false"}
                aria-describedby={error ? `${id}-error` : undefined}
            />
            {error && (
                <ErrorMessage
                    error={error}
                />
            )}
        </div>
    );
};

export default TextInput;
