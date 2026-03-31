


export interface ReviewResponse {
    id: number;
    fullName: string;
    avatarUrl?: string;
    rating: number;
    comment: string;
    isApproved: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ReviewPayload {
   fullName: string;
    rating: number;
    comment: string;
}