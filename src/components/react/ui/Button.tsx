
import clsx from "clsx";
import { Buttonstyles } from "../../../styles/buttonsStyles";
import type { VariantProps } from "class-variance-authority";



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
