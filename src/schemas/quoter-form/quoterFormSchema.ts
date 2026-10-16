import * as yup from 'yup';

// Trim everything and strip phone separators before validating, so values
// like "33 1234 5678" or an autocompleted "correo@dominio.com " don't block
// the step with an error the user can't see the reason for.
export const quoterFormSchema = yup.object({
    clientType: yup
        .string()
        .oneOf(['particular', 'company'], 'Tipo de cliente inválido')
        .required('El tipo de cliente es obligatorio'),
    name: yup
        .string()
        .trim()
        .required('El nombre es obligatorio')
        .min(2, 'El nombre debe tener al menos 2 caracteres'),
    lastName: yup
        .string()
        .trim()
        .when('clientType', {
            is: 'particular',
            then: (schema) =>
                schema.required('El apellido es obligatorio').min(2, 'El apellido debe tener al menos 2 caracteres'),
            otherwise: (schema) => schema.notRequired(),
        }),
    companyRFC: yup.string().trim().notRequired().nullable(),
    phoneNumber: yup
        .string()
        .transform((value) => (typeof value === 'string' ? value.replace(/\D/g, '') : value))
        .required('El número de teléfono es obligatorio')
        .matches(/^[0-9]{10}$/, 'El número de teléfono debe tener 10 dígitos'),
    email: yup
        .string()
        .trim()
        .email('El correo electrónico no es válido'),
})
