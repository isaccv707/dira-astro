
export type ClientType = "particular" | "company" | undefined;

export interface Client {
    lastName?: string | undefined;
    companyRFC?: string | undefined;
    email?: string | undefined;
    name: string;
    clientType: ClientType;
    phoneNumber: string;
}