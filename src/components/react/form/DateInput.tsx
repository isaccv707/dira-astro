import type { FieldError } from "react-hook-form";
import Label from "../ui/Label";

interface DateInputProps {
    id: string;
    label: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    name: string;
    value?: string;
    error?: FieldError | undefined;
    isError?: boolean;
}

const DateInput = ({ id, label, name, onChange, value, error, isError }: DateInputProps) => {
    return (
        <div className="grid gap-1">
            <Label id={id} label={label} />
            <input
                id={id}
                type="date"
                name={name}
                value={value || ""}
                onChange={onChange}
                className={`px-3 py-2 rounded-lg border outline-none transition
          ${isError ? "border-red-500 focus:ring-2 focus:ring-red-400" : "border-gray-300 focus:ring-2 focus:ring-blue-400"}
        `}
            />

            {/* Mensaje de error */}
            {isError && error && (
                <span className="text-sm text-red-500">{error.message}</span>
            )}
        </div>
    );
};

export default DateInput;
