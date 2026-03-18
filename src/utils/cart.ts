import type { Study } from "../interfaces/study.interface";

export const CART_STORAGE_KEY = "dira_cart_studies";
export const CART_UPDATED_EVENT = "dira_cart_updated";

export const getCart = (): Study[] => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const addToCart = (study: Study) => {
    if (typeof window === "undefined") return;
    const cart = getCart();
    const exists = cart.find((s) => s.id === study.id);
    
    if (!exists) {
        const newCart = [...cart, { ...study, quantity: 1 }];
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
        window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT));
    }
};

export const removeFromCart = (studyId: string) => {
    if (typeof window === "undefined") return;
    const cart = getCart();
    const newCart = cart.filter((s) => s.id !== studyId);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
    window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT));
};

export const clearCart = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(CART_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT));
};


