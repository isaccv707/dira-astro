import { ModalProvider } from "../../../contexts/ModalContext";
import { BranchSelectorSection } from "../../../sections/react/BranchSelector-section";
import ReduxProvider from "../../../store/providers/ReduxProvider";

const SelectedBranchWrapper = () => {
  return (
    <ReduxProvider>
      <ModalProvider>
        <BranchSelectorSection />
      </ModalProvider>
    </ReduxProvider>
  );
};

export default SelectedBranchWrapper;
