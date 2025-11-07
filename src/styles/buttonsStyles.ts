import { cva } from "class-variance-authority";

export const Buttonstyles = cva(
  "font-bold rounded transition-colors duration-200 inline-flex items-center justify-center gap-2", // 👈 añadí flex + gap
  {
    variants: {
      variant: {
        submit:
          "bg-green-ligth text-white font-bold hover:bg-green-ligth cursor-pointer",
        cancel:
          "bg-red-500 text-white font-bold hover:bg-red-600 cursor-pointer",
        GoBack: 'text-green-primary hover:text-green-secondary font-semibold text-sm cursor-pointer bg-transparent',
      },
      size: {
        sm: "px-2 py-1 text-sm",
        md: "px-4 py-2 text-base w-full",
        lg: "px-6 py-3 text-lg",
      },
    },
  }
);