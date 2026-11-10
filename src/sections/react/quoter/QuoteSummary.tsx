import { Minus, Plus, Trash2 } from "lucide-react";
import { useStore } from "@nanostores/react";

import Price from "../../../components/react/ui/Price";
import { Buttonstyles } from "../../../styles/buttonsStyles";
import { formatMXN } from "../../../utils/currency";
import {
  removeStudy,
  selectedServiceStore,
  selectedStudiesStore,
  totalsStore,
  updateStudyQuantity,
} from "../../../stores/quoterStore";

const MAX_QUANTITY = 99;

interface QuoteSummaryProps {
  /** Shows the "Continuar" action (step 1). */
  onContinue?: () => void;
}

/** The quote as it stands: studies, quantities and totals (IVA included). */
const QuoteSummary = ({ onContinue }: QuoteSummaryProps) => {
  const studies = useStore(selectedStudiesStore);
  const service = useStore(selectedServiceStore);
  const totals = useStore(totalsStore);
  const count = studies.reduce((acc, study) => acc + (study.quantity ?? 1), 0);

  return (
    <section
      id="resumen-cotizacion"
      aria-labelledby="quote-summary-title"
      className="scroll-mt-24 rounded-clinical-md border border-ui-border bg-white shadow-xs"
    >
      <header className="border-b border-ui-border px-5 py-4">
        <h2 id="quote-summary-title" className="text-lg font-bold tracking-tight text-ink">
          Tu cotización
        </h2>
        <p className="mt-0.5 text-sm text-ink-muted">
          {service && studies.length > 0
            ? `${service.name} · ${count} ${count === 1 ? "estudio" : "estudios"}`
            : "Agrega estudios de la lista para ver el total."}
        </p>
      </header>

      {studies.length > 0 && (
        <ul className="divide-y divide-ui-border">
          {studies.map((study) => {
            const quantity = study.quantity ?? 1;
            const unitPrice = Number(study.priceInfo?.price ?? 0);
            return (
              <li key={study.id} className="px-5 py-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-snug text-ink">{study.name}</p>
                    <p className="mt-0.5 font-mono text-xs text-ink-subtle">{study.code}</p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold tabular-nums text-ink">
                    {formatMXN(unitPrice * quantity)}
                  </p>
                </div>

                <div className="mt-2 flex items-center justify-between gap-3">
                  <div
                    role="group"
                    aria-label={`Cantidad de ${study.name}`}
                    className="inline-flex items-center rounded-clinical-sm border border-ui-border"
                  >
                    <button
                      type="button"
                      onClick={() => updateStudyQuantity(study.id, quantity - 1)}
                      disabled={quantity <= 1}
                      aria-label="Restar uno"
                      className="flex h-9 w-9 items-center justify-center text-ink transition-colors hover:bg-ui-bg disabled:text-ink-subtle/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary"
                    >
                      <Minus aria-hidden="true" className="h-4 w-4" />
                    </button>
                    <span
                      aria-live="polite"
                      className="min-w-8 text-center text-sm font-semibold tabular-nums text-ink"
                    >
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateStudyQuantity(study.id, quantity + 1)}
                      disabled={quantity >= MAX_QUANTITY}
                      aria-label="Sumar uno"
                      className="flex h-9 w-9 items-center justify-center text-ink transition-colors hover:bg-ui-bg disabled:text-ink-subtle/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary"
                    >
                      <Plus aria-hidden="true" className="h-4 w-4" />
                    </button>
                  </div>
                  {quantity > 1 && (
                    <span className="text-xs text-ink-subtle tabular-nums">
                      {formatMXN(unitPrice)} c/u
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeStudy(study.id)}
                    aria-label={`Quitar ${study.name}`}
                    className="ml-auto flex h-9 w-9 items-center justify-center rounded-clinical-sm text-ink-subtle transition-colors hover:bg-red-custom/10 hover:text-red-custom focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary"
                  >
                    <Trash2 aria-hidden="true" className="h-4 w-4" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <div className="border-t border-ui-border px-5 py-4">
        <dl className="space-y-1.5 text-sm">
          <div className="flex justify-between text-ink-muted">
            <dt>Subtotal</dt>
            <dd className="tabular-nums">{formatMXN(totals.subtotal)}</dd>
          </div>
          <div className="flex justify-between text-ink-muted">
            <dt>IVA (16 %)</dt>
            <dd className="tabular-nums">{formatMXN(totals.tax)}</dd>
          </div>
          <div className="!mt-3 flex items-baseline justify-between rounded-clinical-sm bg-yellow-primary px-3 py-2">
            <dt className="font-semibold text-black-custom">Total</dt>
            <dd>
              <Price value={totals.total} size="md" tone="onFill" />
            </dd>
          </div>
        </dl>
        <p className="mt-2 text-xs text-ink-subtle">
          Precios de referencia de tu sucursal, con IVA incluido.
        </p>

        {onContinue && (
          <button
            type="button"
            onClick={onContinue}
            disabled={studies.length === 0}
            className={`${Buttonstyles({ variant: "accent", size: "lg", width: "full" })} mt-4`}
          >
            Continuar con tus datos
          </button>
        )}
      </div>
    </section>
  );
};

export default QuoteSummary;
