import * as yup from 'yup';

export const quoterFormSchema = yup.object({
    clientType: yup
        .string()
        .required('El tipo de cliente es obligatorio'),
    name: yup
        .string()
        .required('El nombre es obligatorio')
        .min(2, 'El nombre debe tener al menos 2 caracteres'),
    lastName: yup
        .string()
        .optional()
        .min(2, 'El apellido debe tener al menos 2 caracteres'),
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