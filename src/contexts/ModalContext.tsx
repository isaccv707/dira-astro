import { createContext, useContext, useState } from "react";
import { MODALS } from "../components/react/modal/modals";


export type ModalPropsType = {
    title: string;
    data: any
}

type ModalType = {
    id: string;
    key: keyof typeof MODALS;
    props: ModalPropsType;
}

type ModalContextType = {
    modals: ModalType[];
    openModalByKey: (key: keyof typeof MODALS, props: ModalPropsType) => string;
    closeModal: (id: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal should be used within a ModalProvider");
    }
    return context;
}

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [modals, setModals] = useState<ModalType[]>([]);

    const openModalByKey = (key: keyof typeof MODALS, props: ModalPropsType) => {
        if (!MODALS[key]) {
            console.error(`The modal with key ${key} does not exist in the MODALS object`);
            return "";
        }
        const id = crypto.randomUUID();
        setModals((prev) => [...prev, { id, key, props }]);
        return id;
    }

    const closeModal = (id: string) => {
        setModals((prev) => prev.filter((modal) => modal.id !== id));
    };

    return (
        <ModalContext.Provider value={{ modals, openModalByKey, closeModal }}>
            {children}
            {
                modals.map(({ id, key, props }) => {
                    const Component = MODALS[key];
                    return (
                        <Component
                            key={id}
                            {...props}
                            id={id}
                        />
                    )
                })
            }
        </ModalContext.Provider>
    )
}

export default ModalContext
