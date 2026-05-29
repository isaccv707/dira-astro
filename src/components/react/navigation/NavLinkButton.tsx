import clsx from "clsx";
import { type VariantProps } from "class-variance-authority";
import { Buttonstyles } from "../../../styles/buttonsStyles";
import { Icon } from "@iconify/react";

interface NavLinkButtonProps extends VariantProps<typeof Buttonstyles> {
  path: string;
  text?: string; // 💡 Opcional: permite botones de "solo icono"
  icon?: string; // 💡 Simplificado: estrictamente un string para Iconify
  onClick?: () => void;
  target?: "_blank" | "_self" | "_parent" | "_top";
  className?: string; // 💡 Clases extra (ej: animaciones hover:scale)
  iconClassName?: string; // 💡 Control del tamaño/color del icono individual
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
}: NavLinkButtonProps) => {
  const isExternal = target === "_blank";

  return (
    <a
      href={path}
      onClick={onClick}
      target={target}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={clsx(Buttonstyles({ variant, size, align, width }), className)}
    >
      {/* 💡 Si viene un icono, se renderiza directamente con Iconify */}
      {icon && <Icon icon={icon} className={iconClassName} />}

      {/* 💡 Si hay texto, lo renderiza. Si además hay icono, le añade un margen a la izquierda */}
      {text && <span className={icon ? "ml-2" : ""}>{text}</span>}
    </a>
  );
};

export default NavLinkButton;
