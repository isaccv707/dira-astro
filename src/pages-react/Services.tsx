
import { services } from "../data/services/services"
import type { ServiceProps } from "./ServiceDetail"

const Services = ({ service }: ServiceProps) => {
    return (
        <div className="mt-10">
            <h1 className="text-center text-3xl font-bold text-green-ligth mb-8">
                Nuestros Servicios
            </h1>
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
                {services.map(({ path, text, textButton, title, id, Icon }) => (
                    <CardService
                        key={id}
                        id={id}
                        Icon={Icon}
                        path={path}
                        text={text}
                        textButton={textButton}
                        title={title}
                    />
                ))}
            </div> */}
        </div>
    )
}

export default Services
