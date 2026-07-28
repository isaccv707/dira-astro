import { cva } from "class-variance-authority";

export const Buttonstyles = cva(
  [
    "inline-flex items-center justify-center gap-2 font-semibold",
    "transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:pointer-events-none",
    "select-none",
  ].join(" "),
  {
    variants: {
      // El radio vive en cada variante (no en la base) porque algunas
      // familias (cta, tile, icon, fab) necesitan un radio distinto a
      // rounded-md y dos clases rounded-* en el mismo elemento compiten
      // de forma impredecible en el CSS generado por Tailwind.
      variant: {
        normal:
          "rounded-md bg-transparent text-black text-left hover:bg-green-primary/5",
        primary:
          "rounded-md bg-green-light text-white hover:bg-green-primary active:bg-green-primary/90",
        secondary:
          "rounded-md bg-green-secondary text-white hover:bg-green-primary active:bg-green-primary/90",
        danger:
          "rounded-md bg-red-custom text-white hover:bg-red-custom/90 active:bg-red-custom/80",
        ghost:
          "rounded-md bg-transparent text-green-primary hover:bg-green-primary/10",
        footer: "text-white underline",
        link: "bg-transparent p-0 h-auto text-green-primary hover:text-green-secondary underline-offset-4 hover:underline",
        outline:
          "rounded-xl border border-ui-border bg-white text-green-primary hover:bg-ui-bg",
        neutral: "rounded-md bg-ui-bg text-grey-custom hover:bg-ui-border",
        text: "bg-transparent p-0 h-auto text-grey-custom hover:text-green-light",
        cta: "rounded-2xl bg-white font-black text-green-primary shadow-xl hover:-translate-y-1 hover:scale-105 active:scale-95 hover:bg-yellow-primary",
        // Sin color de hover propio a propósito: cada consumidor define su
        // propio matiz (rojo para eliminar, gris para cerrar, etc.) vía
        // `className`, evitando que compita con un hover:bg-* fijo aquí.
        icon: "rounded-full bg-transparent p-0",
        fab: "rounded-full text-white shadow-lg hover:scale-110",
        // Sin padding propio a propósito, por la misma razón que "icon":
        // algunos consumidores (tarjetas con el padding en un div interno)
        // necesitan p-0 en el elemento raíz, y compite con un p-* fijo aquí.
        tile: "rounded-2xl border border-ui-border bg-white text-left shadow-sm hover:-translate-y-1 hover:shadow-lg",
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
