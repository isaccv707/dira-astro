import clsx from "clsx";
import { type VariantProps } from "class-variance-authority";
import { Buttonstyles } from "../../../styles/buttonsStyles";
import { Icon } from "@iconify/react";

interface NavLinkButtonProps extends VariantProps<typeof Buttonstyles> {
  path: string;
  text?: string;
  icon?: string;
  onClick?: () => void;
  target?: "_blank" | "_self" | "_parent" | "_top";
  className?: string;
  iconClassName?: string;
  children?: React.ReactNode;
  ariaLabel?: string;
}

const NavLinkButton = ({
  path,
  text,
  variant,
  size,
  align,
  width,
  icon,
  onClick,
  target,
  className,
  iconClassName = "w-6 h-6",
  children,
  ariaLabel,
}: NavLinkButtonProps) => {
  const isExternal = target === "_blank";

  return (
    <a
      href={path}
      onClick={onClick}
      target={target}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={clsx(Buttonstyles({ variant, size, align, width }), className)}
      aria-label={ariaLabel}
    >
      {children ?? (
        <>
          {icon && <Icon icon={icon} className={iconClassName} />}
          {text && <span className={icon ? "ml-2" : ""}>{text}</span>}
        </>
      )}
    </a>
  );
};

export default NavLinkButton;
