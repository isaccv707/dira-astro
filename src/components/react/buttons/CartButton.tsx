import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { getCart, CART_UPDATED_EVENT } from "../../../utils/cart";
import { openDrawer } from "../../../stores/drawerStore";

const CartButton = () => {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const updateCount = () => setItemCount(getCart().length);
    updateCount();
    window.addEventListener(CART_UPDATED_EVENT, updateCount);
    window.addEventListener("storage", updateCount);
    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, updateCount);
      window.removeEventListener("storage", updateCount);
    };
  }, []);

  if (itemCount === 0) return null;

  const label = `Ver estudios seleccionados (${itemCount})`;

  return (
    <button
      type="button"
      onClick={() => openDrawer("DRAWER_STUDIES", { data: getCart() })}
      aria-label={label}
      title={label}
      aria-haspopup="dialog"
      className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-ink text-white shadow-md transition-colors duration-200 hover:bg-brand-ink-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary focus-visible:ring-offset-2 motion-reduce:transition-none"
    >
      <ShoppingCart aria-hidden="true" className="h-6 w-6" />
      <span
        aria-hidden="true"
        className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full border-2 border-white bg-red-custom px-1 text-xs font-bold tabular-nums text-white"
      >
        {itemCount}
      </span>
    </button>
  );
};

export default CartButton;
