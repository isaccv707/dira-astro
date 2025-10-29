

import CardProduct from "../components/react/cards/CardProduct";
import type { Service } from "../interfaces/service.interface";
import ServiceHero from "../sections/service-details/ServiceHero";

export interface ServiceProps {
    service: Service
}

const ServiceDetail = ({ service }: ServiceProps) => {
    const { products } = service;
    return (
        <>
            <ServiceHero service={service} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
                {products?.map(({ description, id, path, title, isRequiredAppointment, preparation, price }) => (
                    <div className="" key={id}>
                        <CardProduct
                            path={'/contact'}
                            description={description}
                            id={id}
                            title={title}
                            isRequiredAppointment={isRequiredAppointment}
                            preparation={preparation}
                            price={price}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}

export default ServiceDetail
