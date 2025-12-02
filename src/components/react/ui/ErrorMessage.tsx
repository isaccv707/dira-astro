import type { FieldError } from "react-hook-form";


interface ErrorProps {
    id?: string;
    error: FieldError | undefined;
}
export const ErrorMessage = ({ id, error }: ErrorProps) => {
    return (
       <p
      id={id}
      className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-1"
    >
      {error?.message}
    </p>
    )
}
