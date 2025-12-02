
export interface Benefits {
    icon: string;
    title: string;
    text: string;
}

export interface Service<T = any> {
    id: string;
    title: string;
    benefits?: Benefits[];
    icon: ImageMetadata;
    path: string;
    description: string;
    products?: T[];
    category?: string;
    tags?: string[];
}