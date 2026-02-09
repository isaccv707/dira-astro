import type { Service } from "../../../interfaces/service.interface"
import BusinessHealthServices from "./BusinessHealthServices"
import HomeShotsServices from "./HomeShotsServices"
import StudiesServices from "./StudiesServices"


type Props = {
  service: Service<any>
}

const SERVICE_VIEW: Record<Service<any>["key"], React.ComponentType<Props>> = {
  "clinical-analyses": StudiesServices,
  "business-health": BusinessHealthServices,
  "home-shots": HomeShotsServices,
}

const ServiceRenderer = ({ service }: Props) => {
  const View = SERVICE_VIEW[service.key];
  return <View service={service} />
}

export default ServiceRenderer
