import type { Service } from "../../../interfaces/service.interface"
import ServiceRenderer from "../../../sections/react/service/ServiceRenderer"
import ReduxProvider from "../providers/ReduxProvider"

interface ServicesWrapperProps {
    service: Service<any>
}
const ServicesWrapper = ({ service }: ServicesWrapperProps) => {
  
    return (
        <ReduxProvider>
            <div
                className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
            >
                <div>
                    <h2
                        className="text-xl sm:text-2xl font-extrabold tracking-tight text-yellow-secondary"
                    >
                        {`Servicios de ${service.title} disponibles`}
                    </h2>
                    <p className="mt-1 text-sm sm:text-base text-grey">
                        Explora nuestro catálogo con una gran variedad de pruebas y
                        encuentra el estudio ideal para ti.
                    </p>
                </div>
            </div>
            <ServiceRenderer service={service} />
        </ReduxProvider>
    )
}

export default ServicesWrapper
