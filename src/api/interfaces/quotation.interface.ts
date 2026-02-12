export interface SelectedStudyPayload {
  id: string;
  name: string;
  price: number;
  quantity?: number;
}

export interface QuotationPayload {
  clientType: string | undefined;
  name: string;
  lastName?: string;
  phoneNumber: string;
  email: string| undefined;
  studies: SelectedStudyPayload[];
}