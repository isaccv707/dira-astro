import React from 'react';
import type { FieldError } from 'react-hook-form';
import Label from '../ui/Label';
import { ErrorMessage } from '../ui/ErrorMessage';

interface TextareaInputProps {
    id: string;
    label: string;
    name: string;
    placeholder?: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
    rows?: number;
    error?: FieldError | undefined;
    isError?: boolean;
}

const TextareaInput = ({
    id,
    label,
    name,
    placeholder = '',
    value,
    onChange,
    rows = 4,
    error,
    isError = false,
}: TextareaInputProps) => {
    const hasError = Boolean(error || isError);
    return (
        <div className="w-full max-w-lg mx-auto">
            <Label id={id} label={label} />

            <textarea
                id={id}
                name={name}
                placeholder={placeholder}
                rows={rows}
                value={value}
                onChange={onChange}
                aria-invalid={isError ? "true" : "false"}
                aria-describedby={isError ? `${id}-error` : undefined}
                className={`
          mt-1 block w-full rounded-md border px-3 py-2 text-gray-700
          shadow-sm focus:outline-none focus:ring-2 focus:ring-green-primary focus:border-green-primary
          transition-colors duration-200 ease-in-out
          ${isError ? 'border-red-custom' : 'border-gray-300'}
          resize-vertical
        `}
            />
            {hasError && (
                <div className='mt-1'>
                    <ErrorMessage
                        error={error}
                    />
                </div>
            )}
        </div>
    );
};

export default TextareaInput;
