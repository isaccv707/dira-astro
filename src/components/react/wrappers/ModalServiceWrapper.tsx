
import { ModalProvider } from "../../../contexts/ModalContext"
import OurServicesSection from "../../../sections/react/OurServices-section"
import ReduxProvider from "../providers/ReduxProvider"


const ModalServiceWrapper = () => {
    return (
        <ReduxProvider>
            <ModalProvider>
                <OurServicesSection />
            </ModalProvider>
        </ReduxProvider>
    )
}

export default ModalServiceWrapper
