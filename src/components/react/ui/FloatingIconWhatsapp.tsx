import { Icon } from "@iconify/react";

import { urlWhatsapp } from "../../../constants/urlWhatsapp";
import { buildWhatsappUrl } from "../../../utils/whatsapp";
import { useActiveBranchContact } from "../../../hooks/useActiveBranchContact";

/**
 * One tap to the active branch's WhatsApp. The previous greeting popover
 * added a step between the visitor and the chat without adding information.
 */
const FloatingIconWhatsapp = () => {
  const contact = useActiveBranchContact();
  const whatsappUrl = contact?.phone ? buildWhatsappUrl(contact.phone) : urlWhatsapp;

  if (!whatsappUrl) return null;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp (se abre en otra pestaña)"
      title="Escríbenos por WhatsApp"
      className="flex h-14 w-14 items-center justify-center rounded-full bg-green-primary text-white shadow-md transition-colors duration-200 hover:bg-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary focus-visible:ring-offset-2 motion-reduce:transition-none"
    >
      <Icon icon="tabler:brand-whatsapp" aria-hidden="true" className="h-7 w-7" />
    </a>
  );
};

export default FloatingIconWhatsapp;
