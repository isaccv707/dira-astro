import Price from "../ui/Price";
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
      <p className="text-2xs font-bold uppercase tracking-wider text-ink-muted">
        Precio del estudio
      </p>

      {priceInfo?.showPrice ? (
        <Price value={priceInfo.price} size="lg" className="mt-2" />
      ) : (
        <div className="mt-2 w-fit rounded-clinical-md border border-ui-border bg-ui-bg px-4 py-2">
          <span className="text-2xs font-bold uppercase tracking-widest text-ink">
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

      <p className="mt-4 flex items-start gap-2 text-2xs leading-relaxed text-ink-subtle">
        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-ink" />
        Precio de referencia para tu sucursal seleccionada. Puedes ajustarla desde
        el selector del sitio.
      </p>
    </div>
  );
};

export default StudyActionCard;
