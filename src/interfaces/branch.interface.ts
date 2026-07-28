import type { Service } from "./service.interface";

export interface Address {
  id: number;
  street: string;
  zipCode: string;
  extNumber: string;
  intNumber: string | null;
  references: string | null;
  neighborhood: string;
  city: string;
}

export interface State {
  id: number;
  name: string;
}

export interface PriceSheet {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}

export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export interface Schedule {
  id: string;
  dayOfWeek: DayOfWeek;
  openTime: string | null;
  closeTime: string | null;
  isClosed: boolean;
  branchId: string;
}

export interface Branch {
  id: string;
  name: string;
  phone: string;
  email: string;
  isActive: boolean;
  urlResults: string;
  stateId: number;
  addressId: number;
  priceSheetId: string;
  createdAt: Date;
  updatedAt: Date;
  address: Address;
  state: State;
  priceSheet?: PriceSheet;
  schedules?: Schedule[];
  services?: Service[];
}

export interface SelectedBranch {
  id: string;
  name: string;
}
