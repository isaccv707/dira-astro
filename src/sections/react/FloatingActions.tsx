import CartButton from "../../components/react/buttons/CartButton";
import FloatingIconWhatsapp from "../../components/react/ui/FloatingIconWhatsapp";
import type { ActiveBranchContact } from "../../api/branchesApi/branchesApi";

interface Props {
  contact?: ActiveBranchContact | null;
}

// Bottom-right stack, clear of the iOS home indicator. The selected-studies
// button only appears once something is selected.
const FloatingActions = ({ contact }: Props) => (
  <div className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-40 flex flex-col items-end gap-3 sm:right-5 in-data-[bottom-bar]:bottom-24 lg:in-data-[bottom-bar]:bottom-5">
    <CartButton />
    <FloatingIconWhatsapp contact={contact} />
  </div>
);

export default FloatingActions;
