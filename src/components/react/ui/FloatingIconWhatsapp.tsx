import { useState } from "react"; // Quitamos useEffect si no se usa
import { FaWhatsapp } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { urlWhatsapp } from "../../../constants/urlWhatsapp";

const FloatingIconWhatsapp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (urlWhatsapp) {
      window.open(urlWhatsapp, '_blank', 'noopener,noreferrer');
    } else {
      console.error("Error: La URL de WhatsApp no está definida en .env");
    }
  };

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-end space-y-2 md:z-50">

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all cursor-pointer"
          aria-label="Abrir chat de Whatsapp"
        >
          <FaWhatsapp size={24} />
        </button>
      )}


      {isOpen && (
        <div className="bg-white p-4 rounded-xl shadow-2xl w-64 animate-fade-in relative border border-gray-100">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 cursor-pointer"
          >
            <MdCancel size={20} />
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
    </div>
  );
};

export default FloatingIconWhatsapp;