import clsx from "clsx";
import { Check, Plus } from "lucide-react";
import { Buttonstyles } from "../../../styles/buttonsStyles";

interface SelectToggleButtonProps {
  isSelected: boolean;
  onToggle: () => void;
  /** Study name, for the accessible label. */
  studyName: string;
  /** Where it is added, e.g. "tus estudios", "la cotización". */
  target: string;
  disabled?: boolean;
}

/** Add / Agregado toggle used by study rows. Stateless: the caller owns the list. */
const SelectToggleButton = ({
  isSelected,
  onToggle,
  studyName,
  target,
  disabled,
}: SelectToggleButtonProps) => (
  <button
    type="button"
    onClick={onToggle}
    disabled={disabled}
    aria-pressed={isSelected}
    aria-label={
      isSelected ? `Quitar ${studyName} de ${target}` : `Agregar ${studyName} a ${target}`
    }
    className={clsx(
      Buttonstyles({ variant: isSelected ? "outline" : "primary", size: "sm" }),
      "min-w-30",
    )}
  >
    {isSelected ? (
      <>
        <Check aria-hidden="true" className="h-4 w-4" />
        Agregado
      </>
    ) : (
      <>
        <Plus aria-hidden="true" className="h-4 w-4" />
        Agregar
      </>
    )}
  </button>
);

export default SelectToggleButton;
