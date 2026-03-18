import { ModalProvider } from "../../../contexts/ModalContext"
import QuickActions from "../../../sections/react/QuickActions-section"


const QuickActionsWrapper = () => {
  return (
    <ModalProvider>
        <QuickActions/>
    </ModalProvider>
  )
}

export default QuickActionsWrapper
