import type { FormEventHandler, ReactNode } from "react";
import { FormProvider as RHFProvider, type UseFormReturn } from "react-hook-form";

interface FormProviderProps {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    children: ReactNode | ReactNode[];
    methods: UseFormReturn<any, any>;
}

const FormProvider = ({ methods, children, onSubmit }: FormProviderProps) => {
    return (
        <RHFProvider {...methods}>
            <form onSubmit={onSubmit}>
                {children}
            </form>
        </RHFProvider>
    )
}

export default FormProvider
