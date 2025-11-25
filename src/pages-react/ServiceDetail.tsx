import { motion } from "framer-motion";
import type { Service } from "../interfaces/service.interface";
import ServiceHero from "../sections/react/service-details/ServiceHero";
import BenefitCard from "../components/react/cards/BenefitCard";

export interface ServiceProps {
    service: Service;
}

const ServiceDetail = ({ service }: ServiceProps) => {
    const { title, description, icon, products, category, benefits = [] } = service;

    return (
        <div className="flex flex-col">
            {/* Hero principal */}
            <ServiceHero service={service} />

            <section className="py-16 bg-white px-4 sm:px-8 md:px-16 mb-10">
                <div className="max-w-6xl mx-auto text-center mb-12">
                    <motion.h3
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-2xl sm:text-3xl font-bold text-green-secondary"
                    >
                        ¿Por qué elegir este servicio?
                    </motion.h3>
                    <p className="text-gray-500 mt-3 text-lg">
                        Brindamos soluciones integrales y confiables con tecnología de
                        vanguardia, asegurando calidad y resultados precisos.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {benefits.map((benefit, index) => (
                        <div key={index}>
                            <BenefitCard benefit={benefit} />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ServiceDetail;
