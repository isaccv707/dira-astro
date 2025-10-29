import { X } from "lucide-react";
import { facebook, instagram, whatsapp } from "../../../assets/icons/networks-icons";
import type { Routes } from "../../../routes/routes";

interface SideBarProps {
    routes: Routes[];
    isOpenSideBar: boolean
    setisOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>
}
const SideBar = ({ routes, isOpenSideBar,setisOpenSideBar }: SideBarProps) => {

    const handleOpenSideBar = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setisOpenSideBar(false);
        }
    };
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-40 z-50 md:hidden flex justify-end"
            onClick={handleOpenSideBar}
        >
            <div className="bg-white w-64 h-full p-6 shadow-lg relative animate-slide-in-right">
                {/* Botón cerrar */}
                <button
                    onClick={() => setisOpenSideBar(false)}
                    className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition"
                    aria-label="Cerrar menú"
                >
                    <X size={24} />
                </button>

                {/* Links */}
                <nav className="mt-10 flex flex-col gap-6">
                    {routes.map(({ path, text }) => (
                        <a
                            key={path}
                            href={path}
                            className="text-gray-700 hover:text-primary transition-colors"
                            onClick={() => setisOpenSideBar(false)}
                        >
                            {text}
                        </a>
                    ))}
                </nav>

                {/* Redes sociales */}
                <div className="mt-10 flex gap-4">
                    <a href="#" aria-label="Facebook">
                        <img src={facebook.src} alt="Facebook" className="w-8 h-8" />
                    </a>
                    <a href="#" aria-label="Instagram">
                        <img src={instagram.src} alt="Instagram" className="w-8 h-8" />
                    </a>
                    <a href="#" aria-label="WhatsApp">
                        <img src={whatsapp.src} alt="WhatsApp" className="w-8 h-8" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SideBar
