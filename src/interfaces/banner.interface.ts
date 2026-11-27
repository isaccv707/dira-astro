/** HOME = hero carousel; PROMO = "Promociones del mes" section. */
export type BannerPlacement = "HOME" | "PROMO";

export interface Banner {
  id: string;
  imageUrl: string;
  mobileImageUrl: string;
  placement: string;
  order: number;
  /** Readable text set in the admin; the image alone is not readable by search engines or screen readers. */
  title?: string | null;
  description?: string | null;
  altText?: string | null;
  /** Internal path (/study/...) or absolute URL. */
  linkUrl?: string | null;
  ctaLabel?: string | null;
  /** Serialized Decimal ("299.00"); promotions only. */
  promoPrice?: string | null;
  regularPrice?: string | null;
  endAt?: string | null;
}

/** Alt text for a banner image: the admin's text, else its title. */
export const bannerAlt = (banner: Banner, fallback: string) =>
  banner.altText?.trim() || banner.title?.trim() || fallback;
