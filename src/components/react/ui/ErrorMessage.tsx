import type { FieldError } from "react-hook-form";


interface ErrorProps {
    id?: string;
    error: FieldError | undefined;
}
export const ErrorMessage = ({ id, error }: ErrorProps) => {
    return (
       <p
      id={id}
      className="text-xs text-red-custom bg-red-custom/5 border border-red-custom/20 rounded-md px-3 py-1"
    >
      {error?.message}
    </p>
    )
}
