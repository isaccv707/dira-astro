import { useEffect, useState } from "react";
import { AlertTriangle, ArrowRight, Check, Plus, ShieldCheck } from "lucide-react";
import clsx from "clsx";

import Price from "../ui/Price";
import type { Study } from "../../../interfaces/study.interface";
import {
  getQuoterStudies,
  getQuoterService,
  removeQuoterStudy,
  QUOTER_UPDATED_EVENT,
  type QuoterService,
} from "../../../utils/quoterStudies";
import { addStudyToQuote, wouldReplaceQuote } from "../../../stores/quoterStore";
import { Buttonstyles } from "../../../styles/buttonsStyles";

interface StudyActionCardProps {
  study: Study;
  /** Service whose price sheet quotes this study; null = not quotable online. */
  quoterService?: QuoterService | null;
}

/** Price + "add to quote" box on the study page. */
const StudyActionCard = ({ study, quoterService = null }: StudyActionCardProps) => {
  const { id, priceInfo } = study;
  const [isInQuote, setIsInQuote] = useState(false);
  const [confirmReplace, setConfirmReplace] = useState(false);

  useEffect(() => {
    const sync = () => setIsInQuote(getQuoterStudies().some((s) => s.id === id));
    sync();
    window.addEventListener(QUOTER_UPDATED_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(QUOTER_UPDATED_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [id]);

  const canQuote = Boolean(quoterService && priceInfo?.showPrice);

  const add = () => {
    if (!quoterService) return;
    if (wouldReplaceQuote(quoterService)) {
      setConfirmReplace(true);
      return;
    }
    addStudyToQuote(study, quoterService);
  };

  const confirmAdd = () => {
    if (quoterService) addStudyToQuote(study, quoterService);
    setConfirmReplace(false);
  };

  return (
    <div className="rounded-clinical-md border border-ui-border bg-white p-6 shadow-xs">
      <p className="text-sm font-semibold text-ink-muted">Precio del estudio</p>

      {priceInfo?.showPrice ? (
        <Price value={priceInfo.price} size="lg" className="mt-1" />
      ) : (
        <p className="mt-1 text-sm text-ink">
          {priceInfo?.message ?? "Consulta el precio en sucursal"}
        </p>
      )}

      {canQuote && (
        <div className="mt-5 space-y-3">
          <button
            type="button"
            onClick={isInQuote ? () => removeQuoterStudy(id) : add}
            aria-pressed={isInQuote}
            className={clsx(
              Buttonstyles({ variant: isInQuote ? "outline" : "primary", size: "lg", width: "full" }),
            )}
          >
            {isInQuote ? (
              <>
                <Check aria-hidden="true" className="h-4 w-4" />
                En tu cotización · Quitar
              </>
            ) : (
              <>
                <Plus aria-hidden="true" className="h-4 w-4" />
                Agregar a la cotización
              </>
            )}
          </button>

          {confirmReplace && (
            <div
              role="alertdialog"
              aria-labelledby="replace-title"
              className="rounded-clinical-sm border border-yellow-secondary/40 bg-yellow-primary/10 p-3 text-sm"
            >
              <p id="replace-title" className="flex items-start gap-2 text-ink">
                <AlertTriangle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-yellow-ink" />
                Tu cotización tiene estudios de {getQuoterService()?.name}. Una cotización
                solo puede incluir un servicio; si continúas, se reemplazan.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={confirmAdd}
                  className={Buttonstyles({ variant: "primary", size: "sm" })}
                >
                  Reemplazar
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmReplace(false)}
                  className={Buttonstyles({ variant: "outline", size: "sm" })}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {isInQuote && (
            <a
              href="/quoter"
              className={Buttonstyles({ variant: "ghost", size: "md", width: "full" })}
            >
              Ir al cotizador
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
          )}
        </div>
      )}

      <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-ink-subtle">
        <ShieldCheck aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-ink" />
        Precio de referencia de tu sucursal, con IVA incluido. Cambia de
        sucursal desde el encabezado.
      </p>
    </div>
  );
};

export default StudyActionCard;
