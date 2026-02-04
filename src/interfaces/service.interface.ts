export type ServiceKey =
    | "clinical-analyses"
    | "business-health"
    | "home-shots"


export interface Benefits {
    icon: string;
    title: string;
    text: string;
}

export interface Service<T = any> {
    id: string;
    title: string;
    key: ServiceKey;
    benefits?: Benefits[];
    icon?: ImageMetadata;
    img?: {
        image45?: ImageMetadata;
        image167?: ImageMetadata;
    };
    path: string;
    description: string;
    products?: T[];
    category?: string;
    tags?: string[];
}