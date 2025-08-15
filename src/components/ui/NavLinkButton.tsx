

interface NavLinkButtonProps {
    path: string;
    text: string;
}

const NavLinkButton = ({path,text}:NavLinkButtonProps) => {
    return (
        <div>
            <a href={path} className="hover:text-primary transition-colors">{text}</a>
        </div>
    )
}

export default NavLinkButton
