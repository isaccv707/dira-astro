import { useState } from "react";

import { urlWhatsapp } from "../../../constants/urlWhatsapp";
import { Icon } from "@iconify/react";

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
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all cursor-pointer"
          aria-label="Abrir chat de Whatsapp"
        >
          <Icon icon={"tabler:brand-whatsapp"} className="w-7 h-auto" />
        </button>
      )}

      {isOpen && (
        <div className="bg-white p-4 rounded-xl shadow-2xl w-64 animate-fade-in relative border border-gray-100">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 cursor-pointer"
          >
            <Icon icon="lucide:x" className="w-7 h-auto" />
          </button>

          <h1 className="text-gray-800 font-semibold">Hola 👋</h1>
          <p className="text-gray-600 text-sm mb-3">
            ¿Necesitas ayuda? Escríbenos por WhatsApp y te responderemos rápido.
          </p>

          <a
            href="#"
            onClick={handleClick}
            className="block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-center w-full transition-colors font-medium"
          >
            Chatear
          </a>
        </div>
      )}
    </>
  );
};

export default FloatingIconWhatsapp;
