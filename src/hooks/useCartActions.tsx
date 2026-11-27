import type { Study } from "../interfaces/study.interface";
import { branchWhatsappUrl } from "../constants/urlWhatsapp";
import { cartWhatsappMessage } from "../utils/whatsappMessages";
import { useActiveBranchContact } from "./useActiveBranchContact";

export const useCartActions = () => {
    const contact = useActiveBranchContact();

    // Names the branch so reception knows where the patient wants to go.
    const formatWhatsAppMessage = (cartItems: Study[], total: number) =>
        cartWhatsappMessage(cartItems, total, contact?.name);

    const scheduleAppointment = (cartItems: Study[], total: number) => {
        if (cartItems.length === 0) return;

        const message = formatWhatsAppMessage(cartItems, total);
        const whatsappUrl = branchWhatsappUrl(contact?.phone, message);
        window.open(whatsappUrl, "_blank");
    };
    return {
        scheduleAppointment
    }
}