
interface Branches {
    id: string;
    name: string;
    address: string;
    phone: string;
    schedule: string;
    mapSrc: string;
    value: string;
    label: string;
}

export const branches: Branches[] = [
    {
        id: "guadalajara",
        value: '',
        label: '',
        name: "Sucursal Guadalajara",
        address: "Av. Juárez 123, Guadalajara, Jalisco",
        phone: "33-1234-5678",
        schedule: "Lunes a Sábado: 7:00am - 7:00pm",
        mapSrc:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!...GUADALAJARA...",
    },
    {
        id: "cdmx",
        name: "Sucursal CDMX",
        value: '',
        label: '',
        address: "Reforma 456, Ciudad de México",
        phone: "55-9876-5432",
        schedule: "Lunes a Domingo: 8:00am - 8:00pm",
        mapSrc:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!...CDMX...",
    },
    {
        id: "monterrey",
        name: "Sucursal Monterrey",
        value: '',
        label: '',
        address: "Av. Constitución 789, Monterrey, NL",
        phone: "81-1122-3344",
        schedule: "Lunes a Viernes: 7:00am - 6:00pm",
        mapSrc:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!...MONTERREY...",
    },
]