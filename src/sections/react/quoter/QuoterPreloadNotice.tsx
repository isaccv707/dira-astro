import { AlertTriangle, CheckCircle2, X } from "lucide-react";

import { Buttonstyles } from "../../../styles/buttonsStyles";
import type { QuoterPreloadResult } from "../../../utils/quoterPreload";
import { getQuoterService } from "../../../utils/quoterStudies";

interface Props {
  result: QuoterPreloadResult;
  onConfirmReplace: () => void;
  onDismiss: () => void;
}

/** Outcome of opening the quoter with ?estudio=<slug>. */
const QuoterPreloadNotice = ({ result, onConfirmReplace, onDismiss }: Props) => {
  const dismiss = (
    <button
      type="button"
      onClick={onDismiss}
      aria-label="Cerrar aviso"
      className={Buttonstyles({ variant: "icon", size: "icon", className: "shrink-0 text-ink-muted hover:bg-ui-bg" })}
    >
      <X aria-hidden="true" className="h-4 w-4" />
    </button>
  );

  if (result.status === "conflict") {
    return (
      <div
        role="alertdialog"
        aria-labelledby="preload-title"
        className="mb-5 rounded-clinical-md border border-yellow-secondary/40 bg-yellow-primary/10 p-4"
      >
        <p id="preload-title" className="flex items-start gap-2 text-sm text-ink">
          <AlertTriangle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-yellow-ink" />
          <span>
            Tu cotización tiene estudios de {getQuoterService()?.name}. Para agregar{" "}
            <strong className="font-semibold">{result.study.name}</strong> ({result.service.name})
            hay que reemplazarlos: una cotización solo puede incluir un servicio.
          </span>
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={onConfirmReplace} className={Buttonstyles({ variant: "primary", size: "sm" })}>
            Reemplazar
          </button>
          <button type="button" onClick={onDismiss} className={Buttonstyles({ variant: "outline", size: "sm" })}>
            Conservar mi cotización
          </button>
        </div>
      </div>
    );
  }

  if (result.status === "unavailable") {
    return (
      <div role="status" className="mb-5 flex items-start justify-between gap-3 rounded-clinical-md border border-ui-border bg-ui-bg p-4">
        <p className="flex items-start gap-2 text-sm text-ink">
          <AlertTriangle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-yellow-ink" />
          Ese estudio no se puede cotizar en línea en esta sucursal. Búscalo abajo o
          pregúntanos por WhatsApp.
        </p>
        {dismiss}
      </div>
    );
  }

  return (
    <div role="status" className="mb-5 flex items-start justify-between gap-3 rounded-clinical-md border border-green-primary/12 bg-green-primary/8 p-4">
      <p className="flex items-start gap-2 text-sm text-ink">
        <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-ink" />
        <span>
          <strong className="font-semibold">{result.study.name}</strong>{" "}
          {result.status === "added" ? "se agregó a tu cotización." : "ya está en tu cotización."}{" "}
          Agrega más estudios o continúa para descargar el PDF.
        </span>
      </p>
      {dismiss}
    </div>
  );
};

export default QuoterPreloadNotice;
