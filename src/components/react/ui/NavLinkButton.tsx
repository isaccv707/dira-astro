import clsx from "clsx";
import { type VariantProps } from "class-variance-authority";
import { Buttonstyles } from "../../../styles/buttonsStyles";

interface NavLinkButtonProps extends VariantProps<typeof Buttonstyles> {
    path: string;
    text: string;
    icon?: ImageMetadata;
    onClick?: () => void;
}

const NavLinkButton = ({ path, text, variant, size }: NavLinkButtonProps) => {
    return (
        <a href={path} className={clsx(Buttonstyles({ variant, size }))}>{text}</a>
    )
}

export default NavLinkButton
