import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { ChevronDown, MapPin } from "lucide-react";
import {
  branchStore,
  openBranchSelectorModal,
} from "../../../stores/branchStore";

interface BranchSwitcherProps {
  /** Branch name resolved at SSR from the branch cookie, avoids a blank pill. */
  initialName?: string | null;
  /** "compact" hides the eyebrow label (mobile header). */
  variant?: "full" | "compact";
}

const BranchSwitcher = ({
  initialName = null,
  variant = "full",
}: BranchSwitcherProps) => {
  const branch = useStore(branchStore);
  const [isOpening, setIsOpening] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  // Before mount, stick to the SSR value so hydration markup matches.
  const name = (isMounted ? branch?.name : null) || initialName;

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

  const isCompact = variant === "compact";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isOpening}
      aria-busy={isOpening}
      aria-label={
        name ? `Sucursal actual: ${name}. Cambiar sucursal` : "Elegir sucursal"
      }
      title={name ? "Cambiar sucursal" : "Elegir sucursal"}
      className="group inline-flex max-w-full items-center gap-2 rounded-full border border-green-primary/15 bg-green-primary/8 px-3 py-1.5 text-left transition-colors duration-200 hover:border-green-primary/30 hover:bg-green-primary/12 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-primary focus-visible:ring-offset-2 disabled:opacity-70"
    >
      <MapPin
        aria-hidden="true"
        className={`h-4 w-4 shrink-0 text-green-primary ${isOpening ? "animate-pulse" : ""}`}
      />

      <span className="flex min-w-0 flex-col leading-tight">
        {!isCompact && (
          <span className="text-[10px] font-bold uppercase tracking-wide text-green-primary">
            {name ? "Tu sucursal" : "Sin sucursal"}
          </span>
        )}
        <span
          className={`truncate text-sm font-bold text-green-light ${isCompact ? "max-w-28" : "max-w-40"}`}
        >
          {name ?? "Elegir sucursal"}
        </span>
      </span>

      <ChevronDown
        aria-hidden="true"
        className="h-4 w-4 shrink-0 text-green-primary transition-transform duration-200 group-hover:translate-y-0.5"
      />
    </button>
  );
};

export default BranchSwitcher;
