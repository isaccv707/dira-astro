import type { Service } from "../../../interfaces/service.interface"
import AvailableSudies from "../../../sections/react/AvailableSudies"
import ReduxProvider from "../providers/ReduxProvider"

interface StudiesWrapperProps {
    service: Service<any>
}
const StudiesWrapper = ({ service }: StudiesWrapperProps) => {
    return (
        <ReduxProvider>
            <AvailableSudies service={service} />
        </ReduxProvider>
    )
}

export default StudiesWrapper
