import type { LucideProps } from "lucide-react";
import NavLinkButton from "../ui/NavLinkButton";

interface CardServiceProps {
    id: string;
    title: string;
    Icon?: React.ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
    text: string;
    textButton: string;
    path: string;
}

const CardService = ({ path, text, textButton, title, id, Icon }: CardServiceProps) => {
    return (
        <div className="max-w-sm w-full h-auto border border-gray-200 rounded-2xl shadow-md dark:bg-primary dark:border-primary p-6 flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

            {Icon && (
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 mb-4">
                    <Icon className="w-8 h-8 text-green-secondary" />
                </div>
            )}


            <h5 className="mb-2 text-lg font-bold tracking-tight text-green-primary">
                {title}
            </h5>


            <p className="mb-6 text-sm text-green-secondary leading-relaxed">
                {text}
            </p>


            <div className="mt-auto">
                <NavLinkButton
                    path={`${path}/${id}`}
                    text={textButton}
                    variant="primary"
                    size="md"
                />
            </div>
        </div>
    );
};

export default CardService;
