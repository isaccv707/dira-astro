import { Menu, X } from "lucide-react";
import { facebook, instagram, whatsapp } from "../../assets/icons";
import logo from "../../assets/images/logo.png";
import { routes } from "../../routes/routes";
import { useState } from "react";
import SideBar from "../../components/sidebar/SideBar";
import NavBar from "../navBar/NavBar";

const Header = () => {
    const [isOpenSideBar, setisOpenSideBar] = useState(false);

    return (
        <header className="bg-white shadow-md px-4 sm:px-8 py-4 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">

                <div className="flex items-center gap-3">
                    <div>
                        <a href="/">
                            <img
                                src={logo.src}
                                alt="logo-dira"
                                className="w-20 h-auto object-contain"
                            />
                        </a>
                    </div>

                    {/* Botón menú solo en móvil */}
                    <div>
                        <button
                            onClick={() => setisOpenSideBar(true)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
                            aria-label="Abrir menú"
                        >
                            <Menu size={24} />
                        </button>
                    </div>

                </div>

                <NavBar />

                <div className="hidden md:flex items-center gap-4">
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

            {isOpenSideBar && (
                <SideBar
                    isOpenSideBar
                    setisOpenSideBar={setisOpenSideBar}
                    routes={routes}
                />
            )}
        </header>
    );
};

export default Header;