import { cva } from "class-variance-authority";

export const Buttonstyles = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-md font-semibold",
    "transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:pointer-events-none",
    "select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        normal: "bg-transparent text-black text-left hover:bg-green-50",
        primary:
          "bg-green-light text-white hover:bg-green-primary active:bg-green-primary/90",
        secondary:
          "bg-green-secondary text-white hover:bg-green-primary active:bg-green-primary/90",
        danger: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700",
        ghost: "bg-transparent text-green-primary hover:bg-green-primary/10",
        footer: "text-white underline",
        link: "bg-transparent p-0 h-auto text-green-primary hover:text-green-secondary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-6 text-base",
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
      width: "auto",
      align: "center",
    },
  },
);
