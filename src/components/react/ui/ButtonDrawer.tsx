import { Menu } from "lucide-react"
import type { DrawerPropsType } from "../../../contexts/DrawerContext"
import type { DRAWERS } from "../drawer/drawers"
import useDrawerManager from "../../../hooks/useDrawerManager"
import { routes } from "../../../routes/routes"
import Button from "./Button"

interface ButtonDrawerProps {
    keyDrawer: "NAVBAR_DRAWER";
    data: any
    title: string;
}
const ButtonDrawer = ({ data = [], keyDrawer, title }: ButtonDrawerProps) => {
    const { open } = useDrawerManager();

    const handleOpenDrawer = () => {
        open(keyDrawer, {
            title: title,
            data: routes
        })
    }
    return (
        <Button onClick={handleOpenDrawer} icon={<Menu />} />
    )
}

export default ButtonDrawer
