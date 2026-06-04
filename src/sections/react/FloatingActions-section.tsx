import CartButton from "../../components/react/buttons/CartButton";
import FloatingIconWhatsapp from "../../components/react/ui/FloatingIconWhatsapp";

const FloatingActionsSection = () => {
  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-end space-y-3 z-40">
      <FloatingIconWhatsapp />
      <CartButton />
    </div>
  );
};

export default FloatingActionsSection;
