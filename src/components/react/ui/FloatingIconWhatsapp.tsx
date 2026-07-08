import { useState } from "react";

import { urlWhatsapp } from "../../../constants/urlWhatsapp";
import Button from "../buttons/Button";
import NavLinkButton from "../navigation/NavLinkButton";

const FloatingIconWhatsapp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (urlWhatsapp) {
      window.open(urlWhatsapp, "_blank", "noopener,noreferrer");
    } else {
      console.error("Error: La URL de WhatsApp no está definida en .env");
    }
  };

  return (
    <>
      {!isOpen && (
        <Button
          type="button"
          onClick={() => setIsOpen(true)}
          variant="fab"
          size="fab"
          className="bg-green-primary hover:bg-green-secondary"
          ariaLabel="Abrir chat de Whatsapp"
          icon="tabler:brand-whatsapp"
          iconClassName="w-7 h-auto"
        />
      )}

      {isOpen && (
        <div className="bg-white p-4 rounded-clinical-md shadow-2xl w-64 motion-safe:animate-fade-up relative border border-ui-border">
          <Button
            type="button"
            onClick={() => setIsOpen(false)}
            variant="icon"
            size="icon"
            className="absolute top-2 right-2 text-grey-custom hover:text-red-custom"
            icon="lucide:x"
            iconClassName="w-7 h-auto"
          />

          <h1 className="text-green-light font-semibold">Hola 👋</h1>
          <p className="text-grey-custom text-sm mb-3">
            ¿Necesitas ayuda? Escríbenos por WhatsApp y te responderemos rápido.
          </p>

          <NavLinkButton
            path="#"
            onClick={handleClick}
            variant="primary"
            width="full"
            text="Chatear"
          />
        </div>
      )}
    </>
  );
};

export default FloatingIconWhatsapp;
