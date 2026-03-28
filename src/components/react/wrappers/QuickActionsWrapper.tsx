import { ModalProvider } from "../../../contexts/ModalContext"
import QuickActions from "../../../sections/react/QuickActions-section"
import ReduxProvider from "../providers/ReduxProvider"


const QuickActionsWrapper = () => {
  return (
    <ReduxProvider>
      <ModalProvider>
        <QuickActions />
      </ModalProvider>
    </ReduxProvider>
  )
}

export default QuickActionsWrapper
