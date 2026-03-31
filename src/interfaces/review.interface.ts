export interface Review {
    id: number;
    fullName: string;
    avatarUrl?: string;
    rating: number;
    comment: string;
    isApproved: boolean;
    createdAt: string;
    updatedAt: string;
}