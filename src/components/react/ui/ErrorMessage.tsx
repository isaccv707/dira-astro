import type { FieldError } from "react-hook-form";


interface ErrorProps {
    error: FieldError;
}
export const ErrorMessage = ({ error }: ErrorProps) => {
    return (
        <div className="bg-red p-1 rounded-md mt-0.5">
            <p className="text-white font-bold text-sm mt-1 text-center">{error.message}</p>
        </div>
    )
}
