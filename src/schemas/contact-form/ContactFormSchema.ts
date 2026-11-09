import * as yup from "yup";
import type { ContactSubject } from "../../api/contactApi/contactApi";

const SUBJECTS: ContactSubject[] = [
  "CLINICAL_ANALYSIS",
  "CORPORATE_HEALTH",
  "HOME_SAMPLING",
  "OTHER",
];

// Same limits as the backend's CreateContactMessageDto.
export const contactFormSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("El nombre es obligatorio")
    .min(2, "Debe tener al menos 2 caracteres")
    .max(100, "No debe exceder los 100 caracteres"),

  email: yup
    .string()
    .trim()
    .email("Correo inválido")
    .max(254, "Correo demasiado largo")
    .required("El correo es obligatorio"),

  phone: yup
    .string()
    // "33 1234 5678" or "(33) 1234-5678" are valid: keep only the digits.
    .transform((value) => (typeof value === "string" ? value.replace(/\D/g, "") : value))
    .required("El teléfono es obligatorio")
    .matches(/^\d{8,15}$/, "Escribe un teléfono de 8 a 15 dígitos"),

  subject: yup
    .string()
    .required("Selecciona un asunto")
    .oneOf(SUBJECTS, "Selecciona un asunto"),

  message: yup
    .string()
    .trim()
    .required("El mensaje es obligatorio")
    .min(10, "Debe tener al menos 10 caracteres")
    .max(2000, "No debe exceder los 2000 caracteres"),

  privacyAccepted: yup
    .boolean()
    .required()
    .oneOf([true], "Debes aceptar el aviso de privacidad para enviar tu mensaje"),

  /** Honeypot: hidden from people, bots fill it. */
  website: yup.string().default(""),
});

export type ContactFormValues = yup.InferType<typeof contactFormSchema>;
