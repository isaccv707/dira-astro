
export type ClientType = 'particular' | 'company'

export interface Client {
    clientType: ClientType;
    name: string;
    lastName?: string;
    phoneNumber: string;
    email: string;
}