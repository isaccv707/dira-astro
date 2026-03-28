import clsx from "clsx";
import { type VariantProps } from "class-variance-authority";
import { Buttonstyles } from "../../../styles/buttonsStyles";

interface NavLinkButtonProps extends VariantProps<typeof Buttonstyles> {
    path: string;
    text: string;
    icon?: ImageMetadata;
    onClick?: () => void;
}

const NavLinkButton = ({ path, text, variant, size, align, icon, onClick, width }: NavLinkButtonProps) => {
    return (
        <a href={path} onClick={onClick} className={clsx(Buttonstyles({ variant, size, align, width }))}>{text}</a>
    )
}

export default NavLinkButton
