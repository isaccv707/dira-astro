import * as yup from 'yup';

export const quoterFormSchema = yup.object({
    clientType: yup
        .string()
        .oneOf(['particular', 'company'], 'Tipo de cliente inválido')
        .required('El tipo de cliente es obligatorio'),
    name: yup
        .string()
        .required('El nombre es obligatorio')
        .min(3, 'El nombre debe tener al menos 2 caracteres'),
    lastName: yup
        .string()
        .when('clientType', {
            is: 'particular',
            then: (schema) =>
                schema.required("El apellido es obligatorio").min(3, 'El apellido debe tener al menos 3 caracteres'),
            otherwise: (schema) => schema.notRequired(), 
        }),
     companyRFC: yup
        .string()
        .when('clientType', {
            is: 'company',
            then: (schema) => schema.required("El RFC de la empresa es obligatorio").matches(/^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/, 'El RFC no es válido'),
            otherwise: (schema) => schema.notRequired().nullable(), 
        }),
    phoneNumber: yup
        .string()
        .required('El número de teléfono es obligatorio')
        .matches(/^[0-9]{10}$/, 'El número de teléfono debe tener 10 dígitos'),
    email: yup
        .string()
        .required('El correo electrónico es obligatorio')
        .email('El correo electrónico no es válido'),
    studies: yup
        .array()
        .of(yup.string().required("Debe ser un estudio válido"))
        .min(1, "Debe seleccionar al menos un estudio")
        .required("Debe seleccionar al menos un estudio"),
})