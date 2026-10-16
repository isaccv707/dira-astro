import { useId, useState } from "react";
import { ChevronDown, RotateCw } from "lucide-react";
import clsx from "clsx";

import PanelTree from "./PanelTree";
import { countPanelLeaves, usePanelTree } from "../../../hooks/usePanelTree";

interface PanelParametersProps {
  studyId: string;
}

// "Ver parámetros" disclosure for studies with isPanel=true. The tree is
// fetched on first expand and cached per study id (see getPanelTree).
const PanelParameters = ({ studyId }: PanelParametersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { status, tree, retry } = usePanelTree(studyId, isOpen);
  const contentId = useId();

  // 404 → panel no longer active; hide the section entirely.
  if (status === "not-found") return null;

  const leafCount =
    status === "success" && tree ? countPanelLeaves(tree.children) : null;

  return (
    <div className="rounded-clinical-sm border border-ui-border bg-ui-bg/50">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-xs font-bold text-green-light transition hover:text-green-primary"
      >
        <span>
          Ver parámetros
          {leafCount !== null && (
            <span className="ml-1 font-semibold text-grey-custom/70">
              ({leafCount})
            </span>
          )}
        </span>
        <ChevronDown
          className={clsx(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <div
          id={contentId}
          className="max-h-64 overflow-y-auto border-t border-ui-border px-3 py-3"
        >
          {(status === "idle" || status === "loading") && (
            <div className="space-y-2" aria-busy="true">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-3 animate-pulse rounded-clinical-sm bg-ui-border/70"
                  style={{ width: `${80 - i * 12}%` }}
                />
              ))}
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-start gap-2">
              <p className="text-xs leading-relaxed text-grey-custom">
                No pudimos cargar los parámetros.
              </p>
              <button
                type="button"
                onClick={retry}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-green-primary hover:underline"
              >
                <RotateCw className="h-3.5 w-3.5" />
                Reintentar
              </button>
            </div>
          )}

          {status === "success" && tree && (
            tree.children.length > 0 ? (
              <>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-grey-custom/70">
                  {leafCount} {leafCount === 1 ? "parámetro" : "parámetros"}
                </p>
                <PanelTree nodes={tree.children} />
              </>
            ) : (
              <p className="text-xs leading-relaxed text-grey-custom">
                Este perfil no tiene parámetros registrados
              </p>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default PanelParameters;
