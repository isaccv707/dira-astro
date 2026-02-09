import { createContext, useContext, useState } from "react";
import { DRAWERS } from "../components/react/drawer/drawers";


export type DrawerPropsType = {
    title: string;
    data: any
}

type DrawerType = {
    id: string;
    key: keyof typeof DRAWERS;
    props: DrawerPropsType;
}

type DrawerContextType = {
    drawers: DrawerType[];
    openDrawerByKey: (
        key: keyof typeof DRAWERS,
        props: DrawerPropsType,
    ) => string;
    closeDrawer: (id: string) => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);


export const useDrawer = () => {
    const context = useContext(DrawerContext);
    if (!context) {
        throw new Error("useDrawer should be used within a DrawerProvider");
    }
    return context;
}



export const DrawerProvider = ({ children }: { children: React.ReactNode }) => {
    const [drawers, setDrawers] = useState<DrawerType[]>([]);

    const openDrawerByKey = (key: keyof typeof DRAWERS, props: DrawerPropsType) => {
        if (!DRAWERS[key]) {
            console.error(`The drawer with key ${key} does not exist in the DRAWERS object`);
            return "";
        }
        const id = crypto.randomUUID();
        setDrawers((prev) => [...prev, { id, key, props }]);
        return id;
    };

    const closeDrawer = (id: string) => {
        setDrawers((prev) => prev.filter((drawer) => drawer.id !== id));
    };

    return (
        <DrawerContext.Provider value={{ drawers, openDrawerByKey, closeDrawer }}>
            {children}

            {drawers.map(({ id, key, props }) => {
                const Component = DRAWERS[key];
                return (
                    <Component
                        key={id}
                        {...props}
                        id={id}
                    />
                );
            })}
        </DrawerContext.Provider>
    );
};


