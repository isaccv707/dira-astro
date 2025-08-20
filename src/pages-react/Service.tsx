import ServiceDetail from "../sections/service-details/ServiceDetail"


interface ServiceProps {
    service: any
}

const Service = ({ service }: ServiceProps) => {
    return (
        <h1>Servicio -  {service.title}</h1>
    )
}

export default Service
