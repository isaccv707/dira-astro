import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { getCart, CART_UPDATED_EVENT } from "../../../utils/cart";
import useDrawerManager from "../../../hooks/useDrawerManager";

const CartButton = () => {
    const [itemCount, setItemCount] = useState(0);
    const { open } = useDrawerManager();

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
        
        // Also listen for storage events from other tabs
        window.addEventListener("storage", handleCartUpdate);

        return () => {
            window.removeEventListener(CART_UPDATED_EVENT, handleCartUpdate);
            window.removeEventListener("storage", handleCartUpdate);
        };
    }, []);

    const handleOpenCart = () => {
        const currentCart = getCart();
        open("STUDIES_DRAWER", {
            title: "Estudios Seleccionados",
            data: currentCart
        });
    };

    if (itemCount === 0) return null;

    return (
        <button
            onClick={handleOpenCart}
            className="relative bg-green-primary hover:bg-green-primary/90 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110 cursor-pointer group mb-2"
            aria-label="Ver carrito"
        >
            <ShoppingCart size={24} className="group-hover:animate-bounce" />
            
            {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in duration-300">
                    {itemCount}
                </span>
            )}
        </button>
    );
};

export default CartButton;
