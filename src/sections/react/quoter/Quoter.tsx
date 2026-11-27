import { useEffect, useRef, useState } from "react";
import { useStore } from "@nanostores/react";
import clsx from "clsx";

import QuoterSelectStudies from "./QuoterSelectStudies";
import QuoterForm from "./QuoterForm";
import QuoteSummary from "./QuoteSummary";
import { Buttonstyles } from "../../../styles/buttonsStyles";
import { formatMXN } from "../../../utils/currency";
import {
  addStudyToQuote,
  ensureQuoterStudiesSynced,
  selectedStudiesStore,
  totalsStore,
} from "../../../stores/quoterStore";
import { getStoredBranchId } from "../../../stores/branchStore";
import {
  QUOTER_STUDY_PARAM,
  preloadStudyIntoQuote,
  type QuoterPreloadResult,
} from "../../../utils/quoterPreload";
import QuoterPreloadNotice from "./QuoterPreloadNotice";

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

  // /quoter?estudio=<slug> (links from the home page, study pages and
  // promotions): add that study before showing step 1, so the service
  // picker opens on the study's own service.
  // Starts null on both server and client (no hydration mismatch); the
  // effect switches to "loading" before step 1 fetches anything.
  const [preload, setPreload] = useState<QuoterPreloadResult | "loading" | null>(null);
  const [selectorKey, setSelectorKey] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get(QUOTER_STUDY_PARAM)?.trim();
    const branchId = getStoredBranchId();
    if (!slug) return;
    setPreload("loading");
    // Drop the param so a reload or Back doesn't add the study again.
    params.delete(QUOTER_STUDY_PARAM);
    const query = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}`);
    if (!branchId) {
      setPreload(null);
      return;
    }
    preloadStudyIntoQuote(slug, branchId)
      .then(setPreload)
      .catch(() => setPreload({ status: "unavailable", slug }));
  }, []);

  const confirmPreloadReplace = () => {
    if (preload && preload !== "loading" && preload.status === "conflict") {
      addStudyToQuote(preload.study, preload.service);
      setPreload({ status: "added", study: preload.study });
      // Remount step 1 so its service picker opens on the new service.
      setSelectorKey((key) => key + 1);
    }
  };

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
                      ? "bg-green-secondary text-black-custom"
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

        {preload && preload !== "loading" && (
          <QuoterPreloadNotice
            result={preload}
            onConfirmReplace={confirmPreloadReplace}
            onDismiss={() => setPreload(null)}
          />
        )}

        {step === "studies" ? (
          preload === "loading" ? (
            <p role="status" className="py-10 text-center text-sm text-ink-muted">
              Agregando el estudio a tu cotización…
            </p>
          ) : (
            <QuoterSelectStudies key={selectorKey} />
          )
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
              className={Buttonstyles({ variant: "accent", size: "md" })}
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
