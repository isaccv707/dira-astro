// Backend only returns sellable studies, so priceInfo is always present.
// `price` is a serialized Decimal (null when showPrice=false); `message`
// is the "consulte en sucursal" text shown instead.
export interface PriceInfo {
  showPrice: boolean;
  price: string | null;
  message: string | null;
}

export interface CatalogItem {
  id: number;
  name: string;
}

export const getCatalogName = (
  value: CatalogItem | string | null | undefined,
): string | null =>
  typeof value === "string" ? value : (value?.name ?? null);

export interface Study {
  id: string;
  name: string;
  slug: string;
  code: string;
  description?: string | null;
  // /studies and /studies/by-slug send the catalog relation; service
  // endpoints may still send a plain string.
  sampleType?: CatalogItem | string | null;
  deliveryTime?: number | null;
  preparation?: string | null;
  isActive?: boolean;
  isPanel?: boolean;
  abbreviation?: string | null;
  // Service endpoints send section/sampleType as plain names.
  section?: CatalogItem | string | null;
  technique?: CatalogItem | string | null;
  createdAt?: string;
  updateAt?: string;
  quantity?: number;
  priceInfo: PriceInfo;
}

// GET /studies/:id/panel-tree — children come pre-ordered; never re-sort.
export interface PanelNode {
  id: string;
  code: string;
  name: string;
  title: string | null;
  abbreviation: string | null;
  isPanel: boolean;
  order: number;
  children: PanelNode[];
}

export interface PanelTree {
  id: string;
  code: string;
  name: string;
  title: string;
  isPanel: true;
  children: PanelNode[];
}
