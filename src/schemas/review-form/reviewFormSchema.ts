import * as yup from "yup"

export const ReviewSchema = yup.object().shape({
  fullName: yup
    .string()
    .required('El nombre es obligatorio')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre es muy largo'),
    
  comment: yup
    .string()
    .required('Cuéntanos tu experiencia')
    .min(10, 'El comentario debe ser más descriptivo (mínimo 10 caracteres)')
    .max(300, 'El comentario no puede exceder los 300 caracteres'),
    
  rating: yup
    .number()
    .typeError('La calificación debe ser un número') 
    .required('La calificación es obligatoria')
    .min(1, 'La calificación mínima es 1')
    .max(5, 'La calificación máxima es 5')
    .integer('Debe ser un número entero'),
});

export type ReviewFormValues = yup.InferType<typeof ReviewSchema>;