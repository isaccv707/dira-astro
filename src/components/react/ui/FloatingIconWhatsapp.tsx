import { useEffect, useState } from "react"
import { FaWhatsapp } from "react-icons/fa";
import { MdCancel } from "react-icons/md";


const FloatingIconWhatsapp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const url = import.meta.env.PUBLIC_URL_WHATSAPP;
    window.open(url)
  }

  useEffect(() => {
    setIsOpen(isOpen)
  }, [])

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-end space-y-2 md:z-50">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-green-500 hover:bg-green-600  text-white p-4 rounded-full shadow-lg transition-all cursor-pointer"
        aria-label="Abrir chat de Whatsapp"
      >
        <FaWhatsapp size={24} />
      </button>

      {isOpen && (
        <div className="bg-white p-4 rounded-xl shadow-2xl w-64 animate-fade-in relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 rounded-3xl cursor-pointer"
          >
            <MdCancel className="text-red" size={20} />
          </button>
          <h1 className="text-gray-800 font-semibold"> Hola </h1>
          <p className="text-gray-600 text-sm">¿Necesitas ayuda? Escríbenos por WhatsApp y te responderemos rápido.</p>
          <a
            onClick={handleClick}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-center w-full cursor-pointer"
          >
            Chatear
          </a>
        </div>
      )}
    </div>
  )
}

export default FloatingIconWhatsapp
