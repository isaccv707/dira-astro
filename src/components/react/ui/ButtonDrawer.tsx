import { Menu } from "lucide-react"
import type { DrawerPropsType } from "../../../contexts/DrawerContext"
import type { DRAWERS } from "../drawer/drawers"
import useDrawerManager from "../../../hooks/useDrawerManager"
import { routes } from "../../../routes/routes"


const ButtonDrawer = () => {
    const { open } = useDrawerManager();
    const handleOpenDrawer = () => {
        open("NAVBAR_DRAWER", {
            title: 'Menu',
            data: routes
        })
    }
    return (
        <button
            onClick={handleOpenDrawer}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            aria-label="Abrir menú"
        >
            <Menu size={24} />
        </button>
    )
}

export default ButtonDrawer
