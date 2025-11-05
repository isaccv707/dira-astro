
import { useEffect, useState } from "react";
import { FaArrowCircleDown } from "react-icons/fa"


const ScrollToSectionButton = () => {
    const [isOpenMessage, setIsOpenMessage] = useState(false);

    useEffect(() => {
        setIsOpenMessage(true);
        const timer = setTimeout(() => {
            setIsOpenMessage(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [])

    const handleClick = () => {
        setIsOpenMessage(false);
        const section = document.getElementById("products-section");
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
    return (
        <div
            className="fixed top-40 right-6 flex flex-col items-center space-y-1 md:z-50 group"
        >
            <button
                id="scroll-to-products"
                onClick={handleClick}
                className="p-3 bg-green-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center"
                aria-label="Ver productos"
            >
                <FaArrowCircleDown size={28} />
            </button>

            <span
                className={`transition-all duration-500 text-sm rounded-md px-2 py-1 shadow-md
          ${isOpenMessage
                        ? "opacity-100 bg-green-primary text-white translate-y-0"
                        : "opacity-0 translate-y-2 pointer-events-none"
                    }`}
            >
                Ver productos
            </span>
        </div>
    )
}

export default ScrollToSectionButton
