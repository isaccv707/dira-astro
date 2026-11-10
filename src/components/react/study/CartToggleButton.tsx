import type { Study } from "../../../interfaces/study.interface";
import { useCartItem } from "../../../hooks/useCartItem";
import SelectToggleButton from "./SelectToggleButton";

/** Adds/removes a study from the selected-studies list (WhatsApp appointment). */
const CartToggleButton = ({ study }: { study: Study }) => {
  const { isInCart, toggle } = useCartItem(study);
  return (
    <SelectToggleButton
      isSelected={isInCart}
      onToggle={toggle}
      studyName={study.name}
      target="tus estudios"
    />
  );
};

export default CartToggleButton;
