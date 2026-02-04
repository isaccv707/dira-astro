import { ModalProvider } from "../../../contexts/ModalContext"
import QuickActions from "../../../sections/react/QuickActions"


const QuickActionsWrapper = () => {
  return (
    <ModalProvider>
        <QuickActions/>
    </ModalProvider>
  )
}

export default QuickActionsWrapper
