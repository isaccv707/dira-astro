import React from 'react'
import type { FieldError } from 'react-hook-form';
import Label from '../ui/Label';
import { ErrorMessage } from '../ui/ErrorMessage';

export interface Options {
    value: string;
    label: string;
}

interface SelectInputProps {
    id: string;
    label: string;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    name: string;
    placeholder?: string;
    options: Options[];
    value?: string;
    error?: FieldError | undefined;
    isError?: boolean;
}

const SelectInput = ({
    id,
    label,
    name,
    options,
    onChange,
    value,
    error,
    isError,
    placeholder,
}: SelectInputProps) => {
    return (
        <div className="w-full max-w-sm mx-auto sm:max-w-md md:max-w-lg">
            <Label
                id={id}
                label={label}
            />
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className={`block w-full px-4 py-2 text-gray-700 bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
          ${isError ? 'border-red-500' : 'border-gray-300'}
          transition-colors duration-200 ease-in-out`}
                aria-invalid={isError ? "true" : "false"}
                aria-describedby={isError ? `${id}-error` : undefined}
            >
                {options.map(option => (
                    <option
                        key={option.value}
                        value={option.value}
                        disabled={option.value === 'Asunto'}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <ErrorMessage
                    error={error}
                />
            )}
        </div>
    );
}

export default SelectInput;
