export interface Study {
    id: string;
    code: string;
    name: string;
    description?: string;
    deliveryTime: number;
    preparation?: string;
    sampleType?: string | null;
    price: number;
    quantity?: number;
    isActive: boolean;
    createdAt?: string;
    updateAt?: string;
}