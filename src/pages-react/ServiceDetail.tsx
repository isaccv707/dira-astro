

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
                {products?.map((product) => (
                    <div className="" key={product.id}>
                        <CardProduct
                            path={'/contact'}
                            description={product.description}
                            id={product.id}
                            title={product.title}
                            isRequiredAppointment={product.isRequiredAppointment}
                            preparation={product.preparation}
                            price={product.price}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}

export default ServiceDetail
