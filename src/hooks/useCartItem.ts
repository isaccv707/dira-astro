import { useEffect, useState } from "react";
import type { Study } from "../interfaces/study.interface";
import {
  addToCart,
  CART_UPDATED_EVENT,
  getCart,
  removeFromCart,
} from "../utils/cart";

/** Whether a study is in the selected-studies list, and a toggle for it. */
export const useCartItem = (study: Study) => {
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const sync = () => setIsInCart(getCart().some((item) => item.id === study.id));
    sync();
    window.addEventListener(CART_UPDATED_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [study.id]);

  const toggle = () => (isInCart ? removeFromCart(study.id) : addToCart(study));

  return { isInCart, toggle };
};
