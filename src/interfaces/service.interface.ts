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

// Services only expose sellable studies: active and priced in the service's
// price sheet. Panel children (unpriced) never appear here — fetch them via
// GET /studies/:id/panel-tree.
// /services/:slug items: catalog fields come as plain names (or null).
// Accepts ?isPanel=true|false to return only profiles or only single studies.
export interface ServiceStudy extends Study {
  isPanel: boolean;
  description: string | null;
  preparation: string | null;
  sampleType: string | null;
  section: string | null;
}

export interface ServiceListStudy extends ServiceStudy {
  title: string;
}

export interface Paginated<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
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
  _count?: Count;
}

// GET /services/:idOrSlug — paginate with studies.total/totalPages, never
// _count.studies (that one counts every study, priced or not).
export interface ServiceDetail extends Service {
  studies?: Paginated<ServiceStudy>;
}

// GET /services — studies come unpaginated; _count.studies = priced studies.
export interface ServiceListItem extends Service {
  studies?: ServiceListStudy[];
}
