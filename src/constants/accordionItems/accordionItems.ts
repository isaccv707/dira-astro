import SelectedStudiesAccordion from "../../components/react/accordion/SelectedStudiesAccordion";
import type { ComponentType } from "react";

interface accordionItems {
    id: string;
    title: string;
    content: ComponentType<any>;
}
export const accordionItems: accordionItems[] = [
    {
        id: "studies",
        title: "Estudios seleccionados",
        content: SelectedStudiesAccordion,
    },
    // {
    //     id: "services",
    //     title: "Servicios",
    //     content:SelectedStudiesAccordion,
    // }
]