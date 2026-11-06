import { cva } from "class-variance-authority";

export const Buttonstyles = cva(
  [
    "inline-flex items-center justify-center gap-2 font-semibold",
    // Only the properties that actually change: never `transition-all`.
    "transition-[color,background-color,border-color,box-shadow] duration-200 motion-reduce:transition-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:pointer-events-none",
    "select-none",
  ].join(" "),
  {
    variants: {
      // The radius lives in each variant (not in the base) because some
      // families (icon, fab) need a different one, and two rounded-* classes
      // on the same element compete unpredictably in Tailwind's output.
      // Feedback is color/border/shadow only: no scale or translate.
      variant: {
        normal:
          "rounded-clinical-sm bg-transparent text-ink text-left hover:bg-green-primary/5",
        // White on brand-ink = 6.2:1 (AA). green-light/green-secondary fail with white text.
        primary:
          "rounded-clinical-sm bg-brand-ink text-white hover:bg-brand-ink-hover active:bg-brand-ink-hover",
        secondary:
          "rounded-clinical-sm bg-green-primary/10 text-brand-ink hover:bg-green-primary/15 active:bg-green-primary/20",
        danger:
          "rounded-clinical-sm bg-red-custom text-white hover:bg-red-custom/90 active:bg-red-custom/80",
        ghost:
          "rounded-clinical-sm bg-transparent text-brand-ink hover:bg-green-primary/10",
        footer: "text-white underline",
        link: "bg-transparent p-0 h-auto text-brand-ink hover:text-brand-ink-hover underline-offset-4 hover:underline",
        outline:
          "rounded-clinical-sm border border-ui-border bg-white text-brand-ink hover:border-brand-ink/30 hover:bg-ui-bg",
        neutral:
          "rounded-clinical-sm bg-ui-bg text-ink-muted hover:bg-ui-border hover:text-ink",
        text: "bg-transparent p-0 h-auto text-ink-muted hover:text-ink",
        cta: "rounded-clinical-md bg-white font-bold text-brand-ink shadow-xs hover:bg-ui-bg hover:shadow-sm",
        // No hover color on purpose: each consumer sets its own tint
        // (red to delete, grey to close, ...) via `className`.
        icon: "rounded-full bg-transparent p-0",
        // Floating overlay: shadow-md is allowed here.
        fab: "rounded-full text-white shadow-md hover:shadow-lg",
        // No padding on purpose, same reason as "icon": some consumers
        // keep the padding on an inner div.
        tile: "rounded-clinical-md border border-ui-border bg-white text-left shadow-xs hover:border-brand-ink/30 hover:shadow-sm",
      },
      size: {
        // Sin alto/padding propio — para variantes que ya definen su
        // propia forma (tile, text) y no deben heredar el h-10 px-4 del
        // tamaño "md" por defecto.
        none: "",
        xs: "h-8 px-3 text-xs",
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-6 text-base",
        icon: "h-9 w-9 p-0",
        fab: "h-14 w-14 text-2xl",
      },

      width: {
        auto: "w-auto",
        full: "w-full",
      },

      // Para botones tipo “nav item” alineado a la izquierda
      align: {
        center: "justify-center",
        left: "justify-start",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
      // No default `width` — letting it default to "auto" would inject
      // `w-auto` even when `size` already sets a fixed width (icon, fab),
      // and the two compete unpredictably in the generated CSS. Only emit
      // a width class when a consumer explicitly asks for one.
      align: "center",
    },
  },
);
