export interface Address {
  id: string;
  street: string;
  zipCode: string;
  extNumber: string;
  intNumber: string;
  references: string;
  neighborhood: string;
  city: string;
}

export interface State {
  id: string;
  name: string;
}

export interface Branch {
  id: string;
  name: string;
  phone: string;
  email: string;
  isActive: boolean;
  urlResults: string;
  mapUrl: string;
  stateId: string;
  addressId: number;
  createdAt: Date;
  updatedAt: Date;
  address: Address;
  state: State;
}

export interface SelectedBranch {
  id: string;
  name: string;
}
