import type { FieldError } from "react-hook-form";
import Label from "../ui/Label";
import { ErrorMessage } from "../ui/ErrorMessage";

interface NumberInputProps {
    id: string;
    label?: string;
    name: string;
    placeholder: string;
    isError?: boolean;
    error?: FieldError;
    type?: string;
    value: string;
    min?: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    variant?: "normal" | "compact"; // 👈 nuevo
}

const NumberInput = ({
    error,
    id,
    label = "",
    name,
    onChange,
    placeholder,
    value,
    isError,
    min = 1,
    type = "number",
    variant = "normal",
}: NumberInputProps) => {
    const isCompact = variant === "compact";

    return (
        <div className="flex flex-col">
            <Label id={id} label={label} />

            <div className="relative">
                <input
                    id={id}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    min={min}
                    className={`
            border rounded-clinical-sm
            ${isCompact ? "px-2 py-1 text-sm text-center w-14" : "px-4 py-2 w-full"}
            focus:outline-none focus:ring-2 focus:ring-green-primary
            transition
            ${isError || error ? "border-red-custom focus:ring-red-custom" : "border-ui-border"}
            placeholder-grey-custom
            disabled:bg-ui-bg disabled:cursor-not-allowed
          `}
                    aria-invalid={isError || error ? "true" : "false"}
                    aria-describedby={error ? `${id}-error` : undefined}
                />
            </div>

            {error && <ErrorMessage error={error} />}
        </div>
    );
};

export default NumberInput;
