
import { ModalProvider } from "../../../contexts/ModalContext"
import OurServices from "../../../sections/react/OurServices"
import ButtonModal from "../ui/ButtonModal"


const ModalServiceWrapper = () => {
    return (
        <ModalProvider>
            <OurServices />
        </ModalProvider>
    )
}

export default ModalServiceWrapper
