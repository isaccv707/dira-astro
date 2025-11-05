// validations/AppointmentFormSchema.ts
import * as yup from "yup";

const optionSchema = yup.object({
  label: yup.string().required(),
  value: yup.string().required(),
});

export const AppointmentFormSchema = yup.object({
  name: yup
    .string()
    .required("El nombre es obligatorio")
    .min(2, "Debe tener al menos 2 caracteres"),

  lastName: yup
    .string()
    .required("El apellido es obligatorio")
    .min(2, "Debe tener al menos 2 caracteres"),

  phoneNumber: yup
    .string()
    .required("El número de teléfono es obligatorio")
    .length(10, "Debe contener exactamente 10 dígitos")
    .matches(/^[0-9]+$/, "El número de teléfono solo debe contener dígitos"),

  email: yup
    .string()
    .required("El correo es obligatorio")
    .email("Debe ser un correo válido"),

 gender: yup
  .string()
  .required("Selecciona tu género")
  .oneOf(["Mujer", "Hombre"], "Selecciona un género válido"),

  branch: yup
  .string()
  .required("Selecciona una sucursal")
  .oneOf(["Colima", "Guadalajara"], "Selecciona una sucursal válida"),

  studies: yup
    .array()
    .of(yup.string().defined())
    .min(1, "Selecciona al menos un estudio")
    .default([]) // 👈 evita undefined
    .required(),

  date: yup
    .string()
    .required("Selecciona una fecha válida"),
});
