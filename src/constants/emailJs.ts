const serviceId = import.meta.env.PUBLIC_SERVICE_EMAILJS ?? '';
const templateId = import.meta.env.PUBLIC_TEMPLATEID_EMAILJS ?? '';
const publicKey = import.meta.env.PUBLIC_KEY_EMAILJS ?? '';

export {
    serviceId,
    templateId,
    publicKey
}