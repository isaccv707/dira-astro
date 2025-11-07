import { createContext, useState, type ReactNode, useContext, useEffect } from "react";
import type { Client } from "../interfaces/client.interface";
import type { Study } from "../interfaces/study.interface";
import type { Totals } from "../interfaces/quoter.interface";


interface QuoterContextProps {
    client: Client | null;
    studies: Study[];
    totals: Totals;
    setClient: (client: Client) => void;
    addStudy: (study: Study) => void;
    removeStudy: (studyId: string) => void;
    clearStudies: () => void;
    // calculatedTotal: () => void;
}


export const QuoterContext = createContext<QuoterContextProps | undefined>(undefined);

export const useQuoterContext = () => {
    const context = useContext(QuoterContext);
    if (!context) {
        throw new Error("useQuoterContext must be used within a QuoterProvider");
    }
    return context;
};

export const QuoterProvider = ({ children }: { children: ReactNode }) => {
    const [client, setClient] = useState<Client | null>(null);
    const [studies, SetStudies] = useState<Study[]>([]);
    const [totals, setTotals] = useState<Totals>({
        subtotal: 0,
        tax: 0,
        total: 0
    });


    const addStudy = (study: Study) => {
        SetStudies((prev) => {
            const exists = prev.find((s) => s.id === study.id)
            if (exists) return prev;
            return [...prev, study]
        })
    }

    const removeStudy = (id: string) => {
        SetStudies(prev => prev.filter((s) => s.id !== id))
    }

    useEffect(() => {
        const subtotal = studies.reduce((acc, s) => acc + s.price * (s.quantity ?? 1), 0);
        const tax = subtotal * 0.16
        const total = subtotal + tax;

        setTotals({ subtotal, tax, total })
    }, [studies])


    const clearStudies = () => {
        setClient(null);
        SetStudies([])
        setTotals({ subtotal: 0, tax: 0, total: 0 })
    }
    return (
        <QuoterContext.Provider
            value={{
                client,
                studies,
                totals,
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


