import { Icon } from "@iconify/react";

interface ButtonNetworkIconsProps {
  icon: string;
  route: string;
  width?: string;
  height?: string;
  name: string;
  ariaLabel?: string;
}

const ButtonNetworkIcons = ({
  icon,
  height,
  width,
  route,
  ariaLabel,
  name,
}: ButtonNetworkIconsProps) => {
  return (
    <a href={route} aria-label={ariaLabel}>
      <Icon icon={icon} className="w-7 h-7" />
    </a>
  );
};

export default ButtonNetworkIcons;
