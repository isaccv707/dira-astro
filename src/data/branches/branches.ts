type BranchState = "Jalisco" | "Colima";

export interface BranchScheduleDay {
    day: string;
    open?: string;
    close?: string;
    closed?: boolean;
}

export interface BranchContact {
    phone: string;
    whatsApp: string;
    email?: string;
}

export interface BranchLocation {
    address: string;
    mapSrc: string;
    googleMapsUrl: string;
    references?: string;
}

export interface BranchPortals {
    urlResults: string;
}

export interface Branch {
    id: string;
    state: BranchState;
    name: string;
    location: BranchLocation;
    contact: BranchContact;
    schedule: BranchScheduleDay[];
    portals: BranchPortals;
}


export const branches: Branch[] = [
    {
        id: "colima-dyra",
        state: "Colima",
        name: "DYRA Colima",
        location: {
            address: "Calle Ignacio Sandoval # 1801, Col. Girasoles, C.P. 28018, Colima, Colima",
            references: "Dentro del Hospital Colima",
            googleMapsUrl: "https://maps.app.goo.gl/5hT6fTYXALp1MeC16",
            mapSrc: "",
        },
        contact: {
            phone: "33 2230 0412",
            whatsApp: "33 2230 0412",
            email: "luis.ramirez@dyranalitica.com",
        },
        schedule: [
            { day: "Abierto 24 Horas", closed: false },
        ],
        portals: {
            urlResults: "https://resultados.dyra.com.mx/colima"
        }
    },
    {
        id: "jalisco-dyra",
        state: "Jalisco",
        name: "DYRA Guadalajara",
        location: {
            address: "Av. Lázaro Cárdenas # 2305, Col. Las Torres, C.P. 44920, Guadalajara, Jalisco",
            mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3733.1234567890123!2d-103.3918196848472!3d20.676678987057736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428b1234567890%3A0xabcdefabcdefabcd!2sDYRA%20Jalisco!5e0!3m2!1ses-419!2smx!4v1696323456789!5m2!1ses-419!2smx",
            googleMapsUrl: "https://maps.app.goo.gl/GdqmeUpKE21h1knS8"
        },
        contact: {
            phone: "33 2614 3494",
            whatsApp: "33 2614 3494",
            email: "https://s26.cogniti.com.mx/dira_consultaweb/Comun/Login.aspx",
        },
        schedule: [
            { day: "Lun", open: "07:00", close: "15:00" },
            { day: "Mar", open: "07:00", close: "15:00" },
            { day: "Mié", open: "07:00", close: "15:00" },
            { day: "Jue", open: "07:00", close: "15:00" },
            { day: "Vie", open: "07:00", close: "15:00" },
            { day: "Sáb", open: "08:00", close: "13:00" },
            { day: "Dom", open: "00:00", close: "00:00" },
        ],
        portals: {
            urlResults: "https://s26.cogniti.com.mx/dyraJalisco_consultaweb/Comun/Login.aspx"
        },
    },
]