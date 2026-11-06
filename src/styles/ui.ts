import { cva, type VariantProps } from "class-variance-authority";

/**
 * Shared class recipes for the site's primitives. Astro and React components
 * both read from here so a primitive looks identical on either side.
 * Tokens: see src/styles/global.css and "Design system" in CLAUDE.md.
 */

/** Eyebrow / badge label above a heading, or a small status chip. */
export const eyebrowStyles = cva(
  "inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-2xs font-bold uppercase tracking-wide",
  {
    variants: {
      tone: {
        brand: "border-green-primary/15 bg-green-primary/8 text-brand-ink",
        warn: "border-yellow-secondary/25 bg-yellow-primary/10 text-yellow-ink",
        neutral: "border-ui-border bg-ui-bg text-ink-muted",
      },
    },
    defaultVariants: { tone: "brand" },
  },
);

export const eyebrowDotStyles = cva("h-1.5 w-1.5 shrink-0 rounded-full", {
  variants: {
    tone: {
      brand: "bg-green-primary",
      warn: "bg-yellow-mark",
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
