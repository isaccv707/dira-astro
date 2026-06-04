export interface PriceInfo {
  showPrice: boolean;
  price: number;
  message?: string;
  hasConfiguredPrice?: boolean;
}

export interface Study {
  id: string;
  name: string;
  slug: string;
  code: string;
  description?: string;
  sampleType?: string | null;
  deliveryTime: number;
  preparation?: string;
  isActive: boolean;
  createdAt?: string;
  updateAt?: string;
  quantity?: number;
  priceInfo: PriceInfo;
}
