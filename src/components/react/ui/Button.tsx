
import clsx from "clsx";
import { Buttonstyles } from "../../../styles/buttonsStyles";
import type { VariantProps } from "class-variance-authority";



interface ButtonProps extends VariantProps<typeof Buttonstyles> {
  type?: "submit" | "reset" | "button";
  text: string;
  onClick?: () => void | Promise<void>;
  icon?: React.ReactNode
  disabled?: boolean
  isLoading?: boolean
}

const Button = ({ text, type = "submit", variant, size, icon, onClick, disabled = false, isLoading }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(Buttonstyles({ variant, size }))}
      disabled={disabled}
    >
      {isLoading ? 'Cargando...' : text}
      {icon && icon}
    </button>
  );
};

export default Button;
