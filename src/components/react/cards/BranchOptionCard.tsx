import { MapPin, Phone, ArrowRight, ExternalLink } from "lucide-react";
import type { Branch } from "../../../interfaces/branch.interface";

interface BranchOptionCardProps {
  branch: Branch;
  onSelect: (branch: Branch) => void;
  action?: "select" | "consult";
}

const BranchOptionCard = ({
  branch,
  onSelect,
  action = "select",
}: BranchOptionCardProps) => {
  const { address, state } = branch;
  const fullAddress = address
    ? `${address.street} #${address.extNumber}, ${address.neighborhood}, ${address.city}, ${state?.name ?? ""}.`
    : "";

  return (
    <button
      type="button"
      onClick={() => onSelect(branch)}
      className="group relative flex w-full items-stretch overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-green-secondary hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-green-primary focus-visible:ring-offset-2"
    >
      <span
        aria-hidden="true"
        className="w-1 shrink-0 bg-gradient-to-b from-green-secondary to-green-primary opacity-70 transition-opacity duration-200 group-hover:opacity-100"
      />

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            {branch.isActive && (
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-secondary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-secondary" />
              </span>
            )}
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-grey-custom">
              {state?.name}
            </span>
          </div>

          {action === "consult" ? (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-green-primary/10 px-2.5 py-1 text-[11px] font-semibold text-green-primary">
              <ExternalLink className="h-3 w-3" />
              Resultados
            </span>
          ) : (
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 shrink-0 -translate-x-1 text-green-primary opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
            />
          )}
        </div>

        <p className="text-base font-bold leading-snug text-black-custom">
          {branch.name}
        </p>

        <p className="flex items-start gap-1.5 text-xs leading-relaxed text-grey-custom">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-secondary" />
          <span>{fullAddress}</span>
        </p>

        {branch.phone && (
          <p className="flex items-center gap-1.5 font-mono text-xs tabular-nums text-grey-custom">
            <Phone className="h-3.5 w-3.5 shrink-0 text-green-secondary" />
            {branch.phone}
          </p>
        )}

        {action === "select" && address?.references && (
          <p className="text-xs font-semibold text-green-primary">
            Ref: {address.references}
          </p>
        )}
      </div>
    </button>
  );
};

export default BranchOptionCard;
