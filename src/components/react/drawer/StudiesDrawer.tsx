import { useEffect, useState } from "react";
import useDrawerManager from "../../../hooks/useDrawerManager";
import type { Study } from "../../../interfaces/study.interface";
import Drawer from "./Drawer";
import SelectedStudiesAccordion from "../accordion/SelectedStudiesAccordion";
import {
  getCart,
  removeFromCart,
  CART_UPDATED_EVENT,
} from "../../../utils/cart";
import NavLinkButton from "../navigation/NavLinkButton";
import Button from "../ui/Button";
import { useCartActions } from "../../../hooks/useCartActions";

interface StudiesDrawerProps {
  id: string;
  data: Study[];
  title: string;
}

const StudiesDrawer = ({ id, title }: StudiesDrawerProps) => {
  const { close } = useDrawerManager();
  const [cartItems, setCartItems] = useState<Study[]>([]);
  const { scheduleAppointment } = useCartActions();

  const updateCart = () => {
    setCartItems(getCart());
  };

  useEffect(() => {
    updateCart();
    window.addEventListener(CART_UPDATED_EVENT, updateCart);
    window.addEventListener("storage", updateCart);
    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, updateCart);
      window.removeEventListener("storage", updateCart);
    };
  }, []);

  const handleRemove = (studyId: string) => {
    removeFromCart(studyId);
  };

  const handleUpdateQuantity = (studyId: string, quantity: number) => {
    const cart = getCart();
    const itemIndex = cart.findIndex((s) => s.id === studyId);
    if (itemIndex > -1) {
      cart[itemIndex].quantity = quantity < 1 ? 1 : quantity;
      localStorage.setItem("dira_cart_studies", JSON.stringify(cart));
      window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT));
    }
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0,
  );

  return (
    <Drawer open={true} onClose={() => close(id)} title={title}>
      <div className="flex flex-col h-[calc(100vh-120px)]">
        <div className="flex-grow overflow-y-auto">
          <SelectedStudiesAccordion
            selectedStudies={cartItems}
            removeStudy={handleRemove}
            updateStudyQuantity={handleUpdateQuantity}
          />
        </div>

        <div className="mt-auto border-t pt-4 space-y-4 bg-white">
          <div className="flex justify-between items-center px-2">
            <span className="text-gray-600 font-semibold uppercase text-sm tracking-wider">
              Total
            </span>
            <span className="text-xl font-black text-green-light">
              ${total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="space-y-2">
            <NavLinkButton
              path="/quoter"
              text="Generar Cotización"
              variant="primary"
              width="full"
              onClick={() => close(id)}
            />
            <Button
              text="Agendar cita"
              type="button"
              onClick={() => scheduleAppointment(cartItems, total)}
              variant="primary"
              width="full"
              size={"md"}
            />
            {/* <button
                            onClick={() => close(id)}
                            className="w-full py-3 text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors uppercase tracking-widest cursor-pointer"
                        >
                            Seguir Comprando
                        </button> */}
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default StudiesDrawer;
