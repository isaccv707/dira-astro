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
        className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-xs font-bold text-ink transition hover:text-brand-ink"
      >
        <span>
          Ver parámetros
          {leafCount !== null && (
            <span className="ml-1 font-semibold text-ink-subtle">
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
              <p className="text-xs leading-relaxed text-ink-muted">
                No pudimos cargar los parámetros.
              </p>
              <button
                type="button"
                onClick={retry}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-ink hover:underline"
              >
                <RotateCw className="h-3.5 w-3.5" />
                Reintentar
              </button>
            </div>
          )}

          {status === "success" && tree && (
            tree.children.length > 0 ? (
              <>
                <p className="mb-2 text-2xs font-bold uppercase tracking-wide text-ink-subtle">
                  {leafCount} {leafCount === 1 ? "parámetro" : "parámetros"}
                </p>
                <PanelTree nodes={tree.children} />
              </>
            ) : (
              <p className="text-xs leading-relaxed text-ink-muted">
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
