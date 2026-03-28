import { DrawerProvider } from "../../../contexts/DrawerContext"
import ReduxProvider from "../providers/ReduxProvider"
import type { Service } from "../../../interfaces/service.interface"
import StudiesServices from "../../../sections/react/service/StudiesServices-section"

interface ServicesWrapperProps {
    service: Service
}
const ServicesWrapper = ({ service }: ServicesWrapperProps) => {

    const { _count } = service;
    
    return (
        <ReduxProvider>
            <DrawerProvider>
                {
                    _count && _count.studies > 0 ? (
                        <StudiesServices/>
                    ) : null
                }
            </DrawerProvider>
        </ReduxProvider>
    )
}

export default ServicesWrapper
