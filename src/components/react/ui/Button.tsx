import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

export const Buttonstyles = cva(
  "font-bold rounded transition-colors duration-200 inline-flex items-center justify-center gap-2", // 👈 añadí flex + gap
  {
    variants: {
      variant: {
        submit:
          "bg-green-ligth text-white font-bold hover:bg-green-ligth cursor-pointer",
      },
      size: {
        sm: "px-2 py-1 text-sm",
        md: "px-4 py-2 text-base w-full",
        lg: "px-6 py-3 text-lg",
      },
    },
  }
);

interface ButtonProps extends VariantProps<typeof Buttonstyles> {
  type?: "submit" | "reset" | "button";
  text: string;
  onClick?: () => void;
  icon?: React.ReactNode
}

const Button = ({ text, type = "submit", variant, size, icon, onClick }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(Buttonstyles({ variant, size }))}
    >
      {text}
      {icon && icon} 
    </button>
  );
};

export default Button;
