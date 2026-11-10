import { MapPin, ArrowRight, ExternalLink, Check } from "lucide-react";
import type { Branch } from "../../../interfaces/branch.interface";
import { getFullAddress } from "../../../utils/maps.utils";

interface BranchOptionCardProps {
  branch: Branch;
  onSelect: (branch: Branch) => void;
  action?: "select" | "consult";
  /** Highlights the branch the visitor already has selected. */
  isCurrent?: boolean;
}

const BranchOptionCard = ({
  branch,
  onSelect,
  action = "select",
  isCurrent = false,
}: BranchOptionCardProps) => {
  const { address, state } = branch;

  return (
    <button
      type="button"
      onClick={() => onSelect(branch)}
      aria-current={isCurrent ? "true" : undefined}
      className={`group relative flex w-full items-stretch overflow-hidden rounded-clinical-md border ${isCurrent ? "border-green-primary bg-green-primary/5" : "border-ui-border bg-white"} text-left shadow-xs transition-[border-color,box-shadow] duration-200 hover:border-brand-ink/30 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-green-primary focus-visible:ring-offset-2`}
    >
      <span
        aria-hidden="true"
        className="w-1 shrink-0 bg-green-primary"
      />

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-ink-muted">
              {state?.name}
            </span>
          </div>

          {isCurrent ? (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand-ink px-2.5 py-1 text-2xs font-semibold text-white">
              <Check className="h-3 w-3" />
              Actual
            </span>
          ) : action === "consult" ? (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-green-primary/10 px-2.5 py-1 text-2xs font-semibold text-brand-ink">
              <ExternalLink className="h-3 w-3" />
              Resultados
            </span>
          ) : (
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-brand-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
            />
          )}
        </div>

        <p className="text-base font-bold leading-snug text-ink">
          {branch.name}
        </p>

        <p className="flex items-start gap-1.5 text-xs leading-relaxed text-ink-muted">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-ink" />
          <span>{getFullAddress(branch)}</span>
        </p>

        {action === "select" && address?.references && (
          <p className="text-xs font-semibold text-brand-ink">
            Ref: {address.references}
          </p>
        )}
      </div>
    </button>
  );
};

export default BranchOptionCard;
