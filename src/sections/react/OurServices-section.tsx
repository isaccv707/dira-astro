import { useGetAllServicesQuery } from "../../api/servicesApi/serviceApi";
import ServiceCard from "../../components/react/cards/ServiceCard";
import useModalManager from "../../hooks/useModalManager";
import type { Service } from "../../interfaces/service.interface";

const OurServices = () => {
    const { open } = useModalManager();
    const { data: services } = useGetAllServicesQuery();
    const handleOpenModal = (service: Service) => {
        open("MODAL_SERVICE", {
            title: service.name,
            data: service,
        });
    };

    return (
        <div className="grid md:flex justify-center gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-3">
            {services?.map((service) => (
                <ServiceCard
                    key={service.id}
                    service={service}
                    handleOpenModal={() => handleOpenModal(service)}
                />
            ))}
        </div>
    );
};

export default OurServices;
