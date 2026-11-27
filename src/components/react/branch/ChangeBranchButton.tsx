import { useState } from "react";
import { ArrowLeftRight, MapPin } from "lucide-react";
import clsx from "clsx";

import { openBranchSelectorModal } from "../../../stores/branchStore";
import { Buttonstyles } from "../../../styles/buttonsStyles";

interface Props {
  /** True when the visitor already picked a branch: "Cambiar" instead of "Elegir". */
  hasBranch: boolean;
  className?: string;
}

/** Opens the branch picker; used where the active branch is shown in a page. */
const ChangeBranchButton = ({ hasBranch, className }: Props) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = async () => {
    if (isOpening) return;
    setIsOpening(true);
    try {
      await openBranchSelectorModal();
    } catch (error) {
      console.error("Error al abrir el selector de sucursales:", error);
    } finally {
      setIsOpening(false);
    }
  };

  const Icon = hasBranch ? ArrowLeftRight : MapPin;

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isOpening}
      aria-busy={isOpening}
      className={clsx(
        Buttonstyles({ variant: hasBranch ? "outline" : "primary", size: "md" }),
        className,
      )}
    >
      <Icon aria-hidden="true" className="h-4 w-4" />
      {hasBranch ? "Cambiar sucursal" : "Elegir sucursal"}
    </button>
  );
};

export default ChangeBranchButton;
