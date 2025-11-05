
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
    textButton: string;
    path: string;
    description: string;
    products?: T[];
    /** Optional category used for filtering and chips */
    category?: string;
    /** Optional tags for finer filters */
    tags?: string[];
}