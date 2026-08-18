// export type ServiceKey =
//     | "clinical-analyses"
//     | "business-health"
//     | "home-shots"

import type { Study } from "./study.interface";
import type { Branch } from "./branch.interface";

export interface Benefits {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Details {
  id: string;
  title: string;
  description: string;
  image?: string | null;
  imageMobile?: string | null;
}

export interface Count {
  studies: number;
}

export interface ServicePriceSheet {
  id: string;
  name: string;
  description: string;
}

export interface Service {
  id?: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  imageUrl?: string;
  mobileImageUrl?: string;
  isActive?: boolean;
  branchId?: string;
  branch?: Branch;
  benefits?: Benefits[];
  details?: Details[];
  priceSheetId?: string | null;
  priceSheet?: ServicePriceSheet | null;
  studies?: Study[];
  _count?: Count;
}
