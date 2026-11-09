import { cva, type VariantProps } from "class-variance-authority";

/**
 * Shared class recipes for the site's primitives. Astro and React components
 * both read from here so a primitive looks identical on either side.
 * Tokens: see src/styles/global.css and "Design system" in CLAUDE.md.
 */

/**
 * Brand palette roles (see "Color" in CLAUDE.md). Solid brand fills carry
 * black-custom text; every pair below is WCAG AA:
 *   black-custom on yellow-primary 11.6 · green-secondary 7.9 ·
 *   yellow-secondary 8.8 · green-light 6.7 · white on brand-ink 6.2.
 * Use them to tell things apart (service, step, study vs profile), not as decoration.
 */
export const BRAND_FILLS = [
  "bg-green-secondary text-black-custom",
  "bg-yellow-primary text-black-custom",
  "bg-green-light text-black-custom",
  "bg-yellow-secondary text-black-custom",
] as const;

/** Picks a brand fill for the n-th item of a list (cycles). */
export const brandFill = (index: number) => BRAND_FILLS[index % BRAND_FILLS.length];

/** Eyebrow / badge label above a heading, or a small status chip. */
export const eyebrowStyles = cva(
  "inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-2xs font-bold uppercase tracking-wide",
  {
    variants: {
      tone: {
        brand: "border-green-secondary bg-green-secondary text-black-custom",
        accent: "border-yellow-primary bg-yellow-primary text-black-custom",
        warn: "border-yellow-secondary bg-yellow-secondary text-black-custom",
        neutral: "border-ui-border bg-ui-bg text-ink-muted",
      },
    },
    defaultVariants: { tone: "brand" },
  },
);

export const eyebrowDotStyles = cva("h-1.5 w-1.5 shrink-0 rounded-full", {
  variants: {
    tone: {
      brand: "bg-ink",
      accent: "bg-green-primary",
      warn: "bg-ink",
      neutral: "bg-ink-subtle",
    },
    // Pulse only for real "live" signals (hero, open now), never decoration.
    live: { true: "motion-safe:animate-pulse", false: "" },
  },
  defaultVariants: { tone: "brand", live: false },
});

export type EyebrowVariants = VariantProps<typeof eyebrowStyles> &
  Pick<VariantProps<typeof eyebrowDotStyles>, "live">;

/** Default surface for cards and content blocks. */
export const cardStyles = cva(
  "rounded-clinical-md border border-ui-border bg-white shadow-xs",
  {
    variants: {
      padding: { none: "", md: "p-6", lg: "p-8" },
      // Hover feedback only on cards that are a single link/button.
      interactive: {
        true: "transition-[border-color,box-shadow] duration-200 hover:border-brand-ink/30 hover:shadow-sm motion-reduce:transition-none",
        false: "",
      },
    },
    defaultVariants: { padding: "md", interactive: false },
  },
);

/** Section heading pair (h2 + lead paragraph). */
export const sectionTitleStyles =
  "text-2xl font-bold tracking-tight text-ink sm:text-3xl";
export const sectionLeadStyles = "mt-2 text-sm text-ink-muted sm:text-base";
