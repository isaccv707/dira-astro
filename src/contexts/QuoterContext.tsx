import { createContext, useState, type ReactNode, useContext, useEffect } from "react";
import type { Client } from "../interfaces/client.interface";
import type { Study } from "../interfaces/study.interface";


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

    const addStudy = (study: Study) => {
        setSelectedStudies((prev) => {
            const exists = prev.find((s) => s.id === study.id)
            if (exists) return prev;
            return [...prev, { ...study, quantity: 1 }]
        })
        console.log(setSelectedStudies)
    }

    const updateStudyQuantity = (id: string, quantity: number) => {
        setSelectedStudies((prev) =>
            prev.map((s) =>
                s.id === id
                    ? {
                        ...s,
                        quantity: quantity < 1 ? 1 : quantity,
                    }
                    : s
            )
        )
    }

    const removeStudy = (id: string) => {
        setSelectedStudies(prev => prev.filter((s) => s.id !== id))
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
        setSelectedStudies([])
        setTotals({ subtotal: 0, tax: 0, total: 0 })
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


