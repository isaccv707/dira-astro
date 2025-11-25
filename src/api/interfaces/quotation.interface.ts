export interface SelectedStudyPayload {
  id: string;
  name: string;
  price: number;
}

export interface QuotationPayload {
  clientType: string;
  name: string;
  lastName?: string;
  phoneNumber: string;
  email: string;
  studies: SelectedStudyPayload[];
}