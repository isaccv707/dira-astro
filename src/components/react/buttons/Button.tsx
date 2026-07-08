import clsx from "clsx";
import { Buttonstyles } from "../../../styles/buttonsStyles";
import type { VariantProps } from "class-variance-authority";
import { Icon } from "@iconify/react";

interface ButtonProps extends VariantProps<typeof Buttonstyles> {
  type?: "submit" | "reset" | "button";
  text?: string;
  onClick?: () => void | Promise<void>;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  icon?: string;
  disabled?: boolean;
  isLoading?: boolean;
  iconClassName?: string;
  className?: string;
  children?: React.ReactNode;
  ariaLabel?: string;
  ariaCurrent?: React.AriaAttributes["aria-current"];
}

const Button = ({
  text,
  type = "submit",
  variant,
  size,
  icon,
  onClick,
  onMouseEnter,
  onMouseLeave,
  disabled = false,
  isLoading,
  width,
  align,
  iconClassName = "w-6 h-6",
  className,
  children,
  ariaLabel,
  ariaCurrent,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={clsx(Buttonstyles({ variant, size, width, align }), className)}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
    >
      {children ?? (
        <>
          {icon && <Icon icon={icon} className={iconClassName} />}
          {isLoading ? "Cargando..." : text}
        </>
      )}
    </button>
  );
};

export default Button;
