import type { Service } from "../../../interfaces/service.interface";
import Button from "../ui/Button";
import NavLinkButton from "../ui/NavLinkButton";



interface ServiceCardProps {
    service: Service
    handleOpenModal: () => void
}

const ServiceCard = ({ service, handleOpenModal }: ServiceCardProps) => {
    const { description, id, slug, name, benefits, icon } = service;
    return (
        <div
            className="group max-w-sm w-full bg-white h-auto border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
        >
            <div
                className="w-16 h-16 flex items-center justify-center rounded-full mb-4 bg-gradient-to-tr from-green-ligth to-greenSecondary p-2"
            >
                <img
                    src={icon}
                    alt="icon-dyra"
                    className="w-10 h-auto filter invert/10 transition-transform duration-300 group-hover:scale-110"
                />
            </div>

            <h5
                className="mb-1 text-lg font-bold tracking-tight text-green-primary"
                data-service-title
            >
                {name}
            </h5>

            {/* {
                category ? (
                    <span className="text-xs px-2 py-1 rounded-full bg-green-primary/10 text-green-primary mb-3">
                        {category}
                    </span>
                ) : null
            } */}

            <p
                className="mb-6 text-sm text-green-secondary leading-relaxed"
                data-service-description
            >
                {description}
            </p>

            <div className="mt-6 w-full flex gap-3 items-center justify-center">
                <Button onClick={handleOpenModal} text="Vista Rápida" variant={"secondary"} size={"sm"} />
                <NavLinkButton
                    path={`service/${slug}`}
                    variant={"primary"}
                    size="sm"
                    text={'Más información'}
                />
            </div>
        </div>
    )
}

export default ServiceCard
