import { useEffect, useRef, useState } from "react";
import { useStore } from "@nanostores/react";
import clsx from "clsx";

import QuoterSelectStudies from "./QuoterSelectStudies";
import QuoterForm from "./QuoterForm";
import QuoteSummary from "./QuoteSummary";
import { Buttonstyles } from "../../../styles/buttonsStyles";
import { formatMXN } from "../../../utils/currency";
import {
  ensureQuoterStudiesSynced,
  selectedStudiesStore,
  totalsStore,
} from "../../../stores/quoterStore";

type Step = "studies" | "details";

const STEPS: { id: Step; label: string }[] = [
  { id: "studies", label: "Estudios" },
  { id: "details", label: "Tus datos y PDF" },
];

/**
 * Quoter: studies first (prices visible right away), personal data only at
 * the end, when it is needed for the PDF. The summary stays beside the steps
 * on desktop; on phones a bottom bar keeps the total and the next step in reach.
 */
const Quoter = () => {
  const [step, setStep] = useState<Step>("studies");
  const studies = useStore(selectedStudiesStore);
  const totals = useStore(totalsStore);
  const itemCount = studies.reduce((acc, study) => acc + (study.quantity ?? 1), 0);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => ensureQuoterStudiesSynced(), []);

  // Move focus to the new step's heading so keyboard and screen-reader
  // users land where the content changed.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    stepHeadingRef.current?.focus();
    stepHeadingRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [step]);

  // Lift the floating buttons above the mobile bottom bar while it shows.
  const showBottomBar = step === "studies" && studies.length > 0;
  useEffect(() => {
    if (showBottomBar) document.body.dataset.bottomBar = "";
    else delete document.body.dataset.bottomBar;
    return () => {
      delete document.body.dataset.bottomBar;
    };
  }, [showBottomBar]);

  const goToDetails = () => studies.length > 0 && setStep("details");
  const currentIndex = STEPS.findIndex((item) => item.id === step);

  return (
    <div
      className={clsx(
        "grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]",
        showBottomBar && "pb-20 lg:pb-0",
      )}
    >
      <div className="min-w-0 rounded-clinical-md border border-ui-border bg-white p-4 shadow-xs sm:p-6">
        <ol className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-ui-border pb-4">
          {STEPS.map((item, index) => {
            const isCurrent = item.id === step;
            const isDone = index < currentIndex;
            return (
              <li
                key={item.id}
                aria-current={isCurrent ? "step" : undefined}
                className="flex items-center gap-2 text-sm"
              >
                <span
                  aria-hidden="true"
                  className={clsx(
                    "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold tabular-nums",
                    isCurrent || isDone
                      ? "bg-brand-ink text-white"
                      : "border border-ui-border text-ink-subtle",
                  )}
                >
                  {index + 1}
                </span>
                <span className={isCurrent ? "font-semibold text-ink" : "text-ink-muted"}>
                  {item.label}
                </span>
              </li>
            );
          })}
        </ol>

        <h2
          ref={stepHeadingRef}
          tabIndex={-1}
          className="mt-5 scroll-mt-24 text-xl font-bold tracking-tight text-ink focus:outline-none"
        >
          {step === "studies" ? "Elige tus estudios" : "¿A nombre de quién?"}
        </h2>
        <p className="mb-5 mt-1 text-sm text-ink-muted">
          {step === "studies"
            ? "Busca por nombre o código y agrega los que necesites. El total se actualiza al instante."
            : "Con estos datos generamos el PDF de tu cotización."}
        </p>

        {step === "studies" ? (
          <QuoterSelectStudies />
        ) : (
          <QuoterForm onBack={() => setStep("studies")} onRestart={() => setStep("studies")} />
        )}
      </div>

      <aside aria-label="Resumen de la cotización" className="lg:sticky lg:top-24">
        <QuoteSummary onContinue={step === "studies" ? goToDetails : undefined} />
      </aside>

      {showBottomBar && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ui-border bg-white px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-md lg:hidden">
          <div className="mx-auto flex max-w-xl items-center justify-between gap-3">
            <a
              href="#resumen-cotizacion"
              className="min-w-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary"
            >
              <span className="block text-xs text-ink-muted">
                {itemCount} {itemCount === 1 ? "estudio" : "estudios"} · Ver resumen
              </span>
              <span className="block text-lg font-bold tabular-nums text-ink">
                {formatMXN(totals.total)}
              </span>
            </a>
            <button
              type="button"
              onClick={goToDetails}
              className={Buttonstyles({ variant: "primary", size: "md" })}
            >
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quoter;
