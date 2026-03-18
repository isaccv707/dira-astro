import type { Study } from "../interfaces/study.interface";


export const useCartActions = () => {
    const URL_WHATSAPP = import.meta.env.PUBLIC_URL_WHATSAPP;

    const formatWhatsAppMessage = (cartItems: Study[], total: number) => {
        const studiesList = cartItems
            .map((item) => `- ${item.name} (${item.quantity || 1}x)`)
            .join("\n");

        return encodeURIComponent(
            `¡Hola! Me gustaría agendar una cita para los siguientes estudios:\n\n` +
            `${studiesList}\n\n` +
            `*Total estimado:* $${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}\n\n` +
            `¿Qué horarios tienen disponibles?`
        );
    }

    const scheduleAppointment = (cartItems: Study[], total: number) => {
        if (cartItems.length === 0) return;

        const message = formatWhatsAppMessage(cartItems, total);
        window.open(`${URL_WHATSAPP}?text=${message}`, "_blank");
    };
    return {
        scheduleAppointment
    }
}