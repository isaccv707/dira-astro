// export type ServiceKey =
//     | "clinical-analyses"
//     | "business-health"
//     | "home-shots"

import type { Study } from "./study.interface";

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
}

export interface Count {
  studies: number;
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
  benefits?: Benefits[];
  details?: Details[];
  _count?: Count;
  studies?: Study[];
}
