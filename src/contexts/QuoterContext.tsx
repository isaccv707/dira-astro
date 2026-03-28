import { createContext, useState, type ReactNode, useContext, useEffect } from "react";
import type { Client } from "../interfaces/client.interface";
import type { Study } from "../interfaces/study.interface";
import { getCart, addToCart, removeFromCart, CART_UPDATED_EVENT } from "../utils/cart";


interface Totals {
    subtotal: number;
    tax: number;
    total: number;
}

interface QuoterContextProps {
    client: Client | null;
    selectedStudies: Study[];
    totals: Totals;
    setClient: (client: Client) => void;
    addStudy: (study: Study) => void;
    removeStudy: (studyId: string) => void;
    clearStudies: () => void;
    updateStudyQuantity: (id: string, quantity: number) => void
}


export const QuoterContext = createContext<QuoterContextProps | undefined>(undefined);


export const QuoterProvider = ({ children }: { children: ReactNode }) => {
    const [client, setClient] = useState<Client | null>(null);
    const [selectedStudies, setSelectedStudies] = useState<Study[]>([]);
    const [totals, setTotals] = useState<Totals>({
        subtotal: 0,
        tax: 0,
        total: 0
    });

    const syncWithLocalStorage = () => {
        setSelectedStudies(getCart());
    };

    useEffect(() => {
        syncWithLocalStorage();
        window.addEventListener(CART_UPDATED_EVENT, syncWithLocalStorage);
        window.addEventListener("storage", syncWithLocalStorage);
        return () => {
            window.removeEventListener(CART_UPDATED_EVENT, syncWithLocalStorage);
            window.removeEventListener("storage", syncWithLocalStorage);
        };
    }, []);

    const addStudy = (study: Study) => {
        addToCart(study);
    }

    const updateStudyQuantity = (id: string, quantity: number) => {
        const cart = getCart();
        const itemIndex = cart.findIndex((s) => s.id === id);
        if (itemIndex > -1) {
            cart[itemIndex].quantity = quantity < 1 ? 1 : quantity;
            localStorage.setItem("dira_cart_studies", JSON.stringify(cart));
            window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT));
        }
    }

    const removeStudy = (id: string) => {
        removeFromCart(id);
    }

    useEffect(() => {
        const total = selectedStudies.reduce((acc, s) => {
            const qty = s.quantity ?? 1;
            return acc + s.price * qty;
        }, 0);

        const tax = total * 0.16;
        const subtotal = total - tax;

        setTotals({ subtotal, tax, total });
    }, [selectedStudies]);


    const clearStudies = () => {
        setClient(null);
        localStorage.removeItem("dira_cart_studies");
        window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT));
    }

    return (
        <QuoterContext.Provider
            value={{
                client,
                selectedStudies,
                totals,
                updateStudyQuantity,
                setClient,
                addStudy,
                removeStudy,
                clearStudies,
            }}
        >
            {children}
        </QuoterContext.Provider>
    )
}


