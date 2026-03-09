// export type ServiceKey =
//     | "clinical-analyses"
//     | "business-health"
//     | "home-shots"

import type { Study } from "./study.interface";


// export interface Benefits {
//     icon: string;
//     title: string;
//     text: string;
// }

// export interface Service<T = any> {
//     id: string;
//     title: string;
//     key: ServiceKey;
//     benefits?: Benefits[];
//     icon?: ImageMetadata;
//     img?: {
//         image45?: ImageMetadata;
//         image167?: ImageMetadata;
//     };
//     path: string;
//     description: string;
//     products?: T[];
//     category?: string;
//     tags?: string[];
// }

export interface Benefits {
    id: string;
    title: string;
    description: string;
    icon: string;
}

export interface Details {
    id: string
    title: string
    description: string
    image: string
}

export interface Count {
    studies: number;
}

export interface Service {
    id?: string
    name: string
    slug: string
    description?: string
    imageUrl?: string
    isActive?: boolean;
    benefits?: Benefits[];
    details?: Details[];
    _count?: Count
    studies?: Study[];
}