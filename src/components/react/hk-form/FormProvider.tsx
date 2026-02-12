import type {  ReactNode } from "react";
import { FormProvider as RHFProvider, type UseFormReturn } from "react-hook-form";

interface FormProviderProps {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    ref?: React.Ref<HTMLFormElement> | undefined
    children: ReactNode | ReactNode[];
    methods: UseFormReturn<any, any>;
}

const FormProvider = ({ methods, children, onSubmit, ref }: FormProviderProps) => {
    return (
        <RHFProvider {...methods}>
            <form ref={ref} onSubmit={onSubmit}>
                {children}
            </form>
        </RHFProvider>
    )
}

export default FormProvider
