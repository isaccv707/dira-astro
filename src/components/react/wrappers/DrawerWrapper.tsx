import { DrawerProvider } from "../../../contexts/DrawerContext"
import { ToastContainer } from "react-toastify";
import ButtonDrawer from "../ui/ButtonDrawer";
import { routes } from "../../../routes/routes";

const DrawerWrapper = () => {
    return (
        <DrawerProvider>
            <ToastContainer />
            <ButtonDrawer keyDrawer="NAVBAR_DRAWER" data={routes} title={'Menu'} />
        </DrawerProvider>
    )
}

export default DrawerWrapper
