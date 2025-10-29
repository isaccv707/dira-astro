import { Menu } from "lucide-react";
import { useState } from "react"
import { routes } from "../../routes/routes";
import SideBar from "../../components/react/sidebar/SideBar";


const HeaderReact = () => {
    const [isOpenSideBar, setisOpenSideBar] = useState(false);

    return (
        <div>
            <button
                onClick={() => setisOpenSideBar(true)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
                aria-label="Abrir menú"
            >
                <Menu size={24} />
            </button>
            {isOpenSideBar && (
                <SideBar
                    isOpenSideBar
                    setisOpenSideBar={setisOpenSideBar}
                    routes={routes}
                />
            )}
        </div>
    )
}

export default HeaderReact
