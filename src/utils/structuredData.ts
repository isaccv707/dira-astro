import type { Branch, DayOfWeek } from "../interfaces/branch.interface";
import type { Post } from "../interfaces/blog.interface";
import {
  FACEBOOK_URL,
  SITE_LEGAL_NAME,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "../constants/site";

// schema.org JSON-LD builders. Every object is rendered by Layout.astro in
// <script type="application/ld+json">; keep values to data we actually have.

type JsonLd = Record<string, unknown>;

const ORGANIZATION_ID = `${SITE_URL}/#organization`;

const SCHEMA_DAY: Record<DayOfWeek, string> = {
  MONDAY: "https://schema.org/Monday",
  TUESDAY: "https://schema.org/Tuesday",
  WEDNESDAY: "https://schema.org/Wednesday",
  THURSDAY: "https://schema.org/Thursday",
  FRIDAY: "https://schema.org/Friday",
  SATURDAY: "https://schema.org/Saturday",
  SUNDAY: "https://schema.org/Sunday",
};

export const organizationJsonLd = (logoUrl: string): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "@id": ORGANIZATION_ID,
  name: SITE_NAME,
  legalName: SITE_LEGAL_NAME,
  url: SITE_URL,
  logo: absoluteUrl(logoUrl),
  medicalSpecialty: "https://schema.org/Laboratory",
  sameAs: [FACEBOOK_URL],
});

export const websiteJsonLd = (): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: "es-MX",
  publisher: { "@id": ORGANIZATION_ID },
});

const formatStreet = ({ address }: Branch) =>
  [
    `${address.street} ${address.extNumber}`.trim(),
    address.intNumber ? `Int. ${address.intNumber}` : null,
    address.neighborhood,
  ]
    .filter(Boolean)
    .join(", ");

export const branchJsonLd = (branch: Branch): JsonLd => {
  const openingHours = (branch.schedules ?? [])
    .filter((s) => !s.isClosed && s.openTime && s.closeTime)
    .map((s) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: SCHEMA_DAY[s.dayOfWeek],
      opens: s.openTime,
      closes: s.closeTime,
    }));

  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${SITE_URL}/branches#${branch.id}`,
    name: branch.name,
    url: absoluteUrl("/branches"),
    parentOrganization: { "@id": ORGANIZATION_ID },
    ...(branch.phone && { telephone: branch.phone }),
    ...(branch.email && { email: branch.email }),
    address: {
      "@type": "PostalAddress",
      streetAddress: formatStreet(branch),
      addressLocality: branch.address.city,
      addressRegion: branch.state?.name,
      postalCode: branch.address.zipCode,
      addressCountry: "MX",
    },
    ...(openingHours.length > 0 && {
      openingHoursSpecification: openingHours,
    }),
  };
};

export const breadcrumbJsonLd = (
  items: { name: string; path: string }[],
): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const blogPostingJsonLd = (post: Post, description: string): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description,
  url: absoluteUrl(`/blog/${post.slug}`),
  mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  datePublished: post.createdAt,
  dateModified: post.updatedAt,
  inLanguage: "es-MX",
  ...(post.image && { image: absoluteUrl(post.image) }),
  ...(post.author?.name && {
    author: { "@type": "Person", name: post.author.name },
  }),
  publisher: { "@id": ORGANIZATION_ID },
});
