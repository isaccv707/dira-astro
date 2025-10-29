

export interface Service<T = any> {
    id: string;
    title: string;
    icon: ImageMetadata;
    textButton: string;
    path: string;
    description: string;
    products?: T[];
}