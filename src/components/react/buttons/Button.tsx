import clsx from "clsx";
import { Buttonstyles } from "../../../styles/buttonsStyles";
import type { VariantProps } from "class-variance-authority";
import { Icon } from "@iconify/react";

interface ButtonProps extends VariantProps<typeof Buttonstyles> {
  type?: "submit" | "reset" | "button";
  text?: string;
  onClick?: () => void | Promise<void>;
  icon?: string;
  disabled?: boolean;
  isLoading?: boolean;
  iconClassName?: string;
}

const Button = ({
  text,
  type = "submit",
  variant,
  size,
  icon,
  onClick,
  disabled = false,
  isLoading,
  width,
  align,
  iconClassName = "w-6 h-6",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(Buttonstyles({ variant, size, width, align }))}
      disabled={disabled}
    >
      {icon && <Icon icon={icon} className={iconClassName} />}
      {isLoading ? "Cargando..." : text}
    </button>
  );
};

export default Button;
