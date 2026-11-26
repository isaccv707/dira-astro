import type { Study } from "../interfaces/study.interface";
import { urlWhatsapp } from "../constants/urlWhatsapp";
import { buildWhatsappUrl } from "../utils/whatsapp";
import { useActiveBranchContact } from "./useActiveBranchContact";

export const useCartActions = () => {
    const contact = useActiveBranchContact();

    const formatWhatsAppMessage = (cartItems: Study[], total: number) => {
        const studiesList = cartItems
            .map((item) => `- ${item.name} (${item.quantity || 1}x)`)
            .join("\n");

        return `¡Hola! Me gustaría agendar una cita para los siguientes estudios:\n\n` +
            `${studiesList}\n\n` +
            `*Total estimado:* $${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}\n\n` +
            `¿Qué horarios tienen disponibles?`;
    }

    const scheduleAppointment = (cartItems: Study[], total: number) => {
        if (cartItems.length === 0) return;

        const message = formatWhatsAppMessage(cartItems, total);
        const whatsappUrl = contact?.phone
            ? buildWhatsappUrl(contact.phone, message)
            : `${urlWhatsapp}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
    };
    return {
        scheduleAppointment
    }
}