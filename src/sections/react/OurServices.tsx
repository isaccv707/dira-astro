import ServiceCard from "../../components/react/cards/ServiceCard";
import { services } from "../../data/services/services";
import useModalManager from "../../hooks/useModalManager";
import type { Service } from "../../interfaces/service.interface";

const OurServices = () => {
    const { open } = useModalManager();

    const handleOpenModal = (service: Service) => {
        open("MODAL_SERVICE", {
            title: service.title,
            data: service,
        });
    };

    return (
        <section className="py-10 sm:py-14 lg:py-16">
            <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-green-ligth mb-6 sm:mb-8">
                Nuestros Servicios
            </h1>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch">
                {services.map((service) => (
                    <ServiceCard
                        key={service.id}
                        service={service}
                        handleOpenModal={() => handleOpenModal(service)}
                    />
                ))}
            </div>

        </section>
    );
};

export default OurServices;
