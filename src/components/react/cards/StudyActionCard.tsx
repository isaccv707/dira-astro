import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import type { Study } from "../../../interfaces/study.interface";
import {
  addQuoterStudy,
  removeQuoterStudy,
  getQuoterStudies,
  QUOTER_UPDATED_EVENT,
} from "../../../utils/quoterStudies";
import Button from "../buttons/Button";
import NavLinkButton from "../navigation/NavLinkButton";

interface StudyActionCardProps {
  study: Study;
}

const StudyActionCard = ({ study }: StudyActionCardProps) => {
  const { id, priceInfo } = study;
  const [isInQuote, setIsInQuote] = useState(false);

  useEffect(() => {
    const checkQuoteStatus = () =>
      setIsInQuote(getQuoterStudies().some((s) => s.id === id));

    checkQuoteStatus();
    window.addEventListener(QUOTER_UPDATED_EVENT, checkQuoteStatus);
    window.addEventListener("storage", checkQuoteStatus);
    return () => {
      window.removeEventListener(QUOTER_UPDATED_EVENT, checkQuoteStatus);
      window.removeEventListener("storage", checkQuoteStatus);
    };
  }, [id]);

  const handleAction = () => {
    if (isInQuote) {
      removeQuoterStudy(id);
    } else {
      addQuoterStudy(study);
    }
  };

  return (
    <div className="bg-white p-6 rounded-clinical-lg shadow-xs border border-ui-border">
      <p className="text-[10px] font-bold uppercase tracking-wider text-grey-custom">
        Precio del estudio
      </p>

      {priceInfo?.showPrice ? (
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-sm font-black text-grey-custom">$</span>
          <span className="text-4xl font-black text-green-light tracking-tighter">
            {priceInfo.price.toLocaleString("es-MX", {
              minimumFractionDigits: 2,
            })}
          </span>
          <span className="ml-1 text-[10px] font-black uppercase tracking-widest text-green-light/60">
            MXN
          </span>
        </div>
      ) : (
        <div className="mt-2 w-fit rounded-clinical-md border border-ui-border bg-ui-bg px-4 py-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-green-light">
            {priceInfo?.message ?? "Consulte en sucursal"}
          </span>
        </div>
      )}

      <div className="mt-6 space-y-3">
        <Button
          type="button"
          onClick={handleAction}
          variant={isInQuote ? "danger" : "primary"}
          width="full"
          size="lg"
          text={isInQuote ? "Quitar del cotizador" : "Agregar al cotizador"}
          icon={isInQuote ? "lucide:trash-2" : "lucide:shopping-cart"}
        />

        {isInQuote && (
          <NavLinkButton
            path="/quoter"
            variant="ghost"
            width="full"
            size="md"
            text="Ir al cotizador"
            icon="lucide:arrow-right"
          />
        )}
      </div>

      <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-grey-custom/70">
        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-primary" />
        Precio de referencia para tu sucursal seleccionada. Puedes ajustarla desde
        el selector del sitio.
      </p>
    </div>
  );
};

export default StudyActionCard;
