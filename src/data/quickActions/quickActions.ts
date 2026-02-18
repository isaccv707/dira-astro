import type { IconType } from "react-icons";

import { CiCalendar } from "react-icons/ci";
import { BiDollar } from "react-icons/bi";


interface QuickActions {
    Icon: IconType;
    text: string;
    path: string;
    bgColor: string;
    disabled?: boolean;
}


export const quickActions: QuickActions[] = [
    {
        Icon: CiCalendar,
        text: "Agenda tu cita",
        path: "https://wa.me/3318622542",
        bgColor: "bg-green-primary",
    },
    {
        Icon: BiDollar,
        text: "Cotizador",
        path: "/quoter",
        bgColor: 'bg-yellow-primary'
    }
];