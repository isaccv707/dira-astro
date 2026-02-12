import type { Service } from "../../../interfaces/service.interface"
import BusinessHealthServices from "./BusinessHealthServices"
import HomeShotsServices from "./HomeShotsServices"
import StudiesServices from "./StudiesServices"

// 1. Definimos el tipo estricto que esperan tus sub-componentes
// (Esto coincide con lo que ya tienen definidos tus archivos hijos)
type ChildComponentProps = {
  service: Service<any>
}

// 2. Definimos el tipo flexible para ESTE componente (ServiceRenderer)
// Este es el que permite que le llegue 'undefined' sin explotar
type RendererProps = {
  service: Service<any> | undefined | null
}

// 3. El mapa usa el tipo estricto (ChildComponentProps)
const SERVICE_VIEW: Record<string, React.ComponentType<ChildComponentProps>> = {
  "clinical-analyses": StudiesServices,
  "business-health": BusinessHealthServices,
  "home-shots": HomeShotsServices,
}

const ServiceRenderer = ({ service }: RendererProps) => {
  // GUARD CLAUSE 1: Si no hay servicio, retornamos null inmediatamente.
  // TypeScript entiende que debajo de esta línea, 'service' YA NO es null/undefined.
  if (!service) {
    return null;
  }

  // Ahora es seguro acceder a service.key
  const View = SERVICE_VIEW[service.key];

  // GUARD CLAUSE 2: Si la key no tiene componente asociado, null.
  if (!View) {
    return null;
  }

  // Renderizamos. Como ya pasamos el primer IF, TypeScript sabe que
  // 'service' cumple con 'Service<any>', así que es compatible con 'ChildComponentProps'.
  return <View service={service} />
}

export default ServiceRenderer