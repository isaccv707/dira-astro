export interface Study {
    id: string;
    name: string;
    slug: string;
    code: string;
    description?: string;
    price: number;
    sampleType?: string | null;
    deliveryTime: number;
    preparation?: string;
    isActive: boolean;
    createdAt?: string;
    updateAt?: string;
    quantity?: number;
}