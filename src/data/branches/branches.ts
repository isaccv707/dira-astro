
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
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.6954157632513!2d-103.40906052529478!3d20.681967099600417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428ae8af315366f%3A0xefd2f82cd66194d4!2sDe%20Los%20Abetos%20307%2C%20Los%20Pinos%2C%2045120%20Zapopan%2C%20Jal.!5e0!3m2!1ses!2smx!4v1738798410070!5m2!1ses!2smx",
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
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.6954157632513!2d-103.40906052529478!3d20.681967099600417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428ae8af315366f%3A0xefd2f82cd66194d4!2sDe%20Los%20Abetos%20307%2C%20Los%20Pinos%2C%2045120%20Zapopan%2C%20Jal.!5e0!3m2!1ses!2smx!4v1738798410070!5m2!1ses!2smx",
    },
]