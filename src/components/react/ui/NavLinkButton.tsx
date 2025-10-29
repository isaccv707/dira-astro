import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const navLinkButtonStyles = cva(
    "font-bold rounded transition-colors duration-200",
    {
        variants: {
            variant: {
                navigation: "text-white font-bold",
                primary: "bg-green-secondary text-white font-bold text-center hover:bg-green-primary"
            },
            size: {
                sm: "px-2 py-1 text-sm",
                md: "px-4 py-2 text-base",
                lg: "px-6 py-3 text-lg",
            },
        }
    }
)

interface NavLinkButtonProps extends VariantProps<typeof navLinkButtonStyles> {
    path: string;
    text: string;
    icon?: ImageMetadata;
    onClick?: () => void;
}

const NavLinkButton = ({ path, text, variant, size }: NavLinkButtonProps) => {
    return (
        <a href={path} className={clsx(navLinkButtonStyles({ variant, size }))}>{text}</a>
    )
}

export default NavLinkButton
