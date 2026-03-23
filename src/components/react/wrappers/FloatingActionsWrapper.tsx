import { DrawerProvider } from "../../../contexts/DrawerContext"
import CartButton from "../ui/CartButton";
import FloatingIconWhatsapp from "../ui/FloatingIconWhatsapp";

const FloatingActionsWrapper = () => {
    return (
        <DrawerProvider>
            <div className="fixed bottom-5 right-5 flex flex-col items-end space-y-3 z-40">
                <CartButton />
                <FloatingIconWhatsapp />
            </div>
        </DrawerProvider>
    )
}

export default FloatingActionsWrapper

