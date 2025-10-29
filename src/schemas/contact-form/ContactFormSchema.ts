import * as yup from 'yup';

export const formSchema = yup.object().shape({
  name: yup
    .string()
    .required('El nombre es obligatorio')
    .min(2, 'Debe tener al menos 2 caracteres'),

  email: yup
    .string()
    .email('Correo inválido')
    .required('El correo es obligatorio'),

  phone: yup
    .string()
    .matches(/^\d+$/, 'Solo se permiten números')
    .min(8, 'Debe tener al menos 8 dígitos')
    .required('El teléfono es obligatorio'),

  affair: yup
    .string()
    .test(
      'not-default',
      'Debes seleccionar un asunto válido',
      value => value !== 'Asunto'
    )
    .required('El asunto es obligatorio'),

  message: yup
    .string()
    .required('El mensaje es obligatorio')
    .min(10, 'Debe tener al menos 10 caracteres'),
});
