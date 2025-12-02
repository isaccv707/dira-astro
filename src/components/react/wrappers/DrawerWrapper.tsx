import { DrawerProvider } from "../../../contexts/DrawerContext"
import { ToastContainer } from "react-toastify";
import NavDrawer from "../drawer/NavDrawer";
import ButtonDrawer from "../ui/ButtonDrawer";

const DrawerWrapper = () => {
    return (
        <DrawerProvider>
            <ToastContainer />
            <ButtonDrawer />
        </DrawerProvider>
    )
}

export default DrawerWrapper
