import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { getCart, CART_UPDATED_EVENT } from "../../../utils/cart";
import { openModal } from "../../../stores/modalStore";
import { openDrawer } from "../../../stores/drawerStore";
import Button from "./Button";

const CartButton = () => {
  const [itemCount, setItemCount] = useState(0);

  const updateCount = () => {
    const cart = getCart();
    setItemCount(cart.length);
  };

  useEffect(() => {
    updateCount();

    const handleCartUpdate = () => {
      updateCount();
    };

    window.addEventListener(CART_UPDATED_EVENT, handleCartUpdate);

    window.addEventListener("storage", handleCartUpdate);

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, handleCartUpdate);
      window.removeEventListener("storage", handleCartUpdate);
    };
  }, []);

  const handleOpenCart = () => {
    const currentCart = getCart();

    openDrawer("DRAWER_STUDIES", {
      data: currentCart,
    });
  };

  if (itemCount === 0) return null;

  return (
    <Button
      type="button"
      onClick={handleOpenCart}
      variant="fab"
      size="fab"
      className="relative bg-green-primary hover:bg-green-primary/90 group mb-2"
      ariaLabel="Ver carrito"
    >
      <ShoppingCart size={24} className="group-hover:animate-bounce" />

      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-custom text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in duration-300">
          {itemCount}
        </span>
      )}
    </Button>
  );
};

export default CartButton;
