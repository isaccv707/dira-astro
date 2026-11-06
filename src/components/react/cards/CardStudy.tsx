import Price from "../ui/Price";
import StudyCode from "../ui/StudyCode";
import { useState, useEffect } from "react";
import {
  FlaskConical,
  Calendar,
  Timer,
} from "lucide-react";

import NavLinkButton from "../navigation/NavLinkButton";
import Button from "../buttons/Button";
import PanelBadge from "../panel/PanelBadge";
import PanelParameters from "../panel/PanelParameters";
import {
  getCatalogName,
  type Study,
} from "../../../interfaces/study.interface";
import { getFastingHours } from "../../../utils/studyPreparation";
import {
  addToCart,
  getCart,
  removeFromCart,
  CART_UPDATED_EVENT,
} from "../../../utils/cart";

interface CardStudyProps {
  study: Study;
  isRequiredAppointment?: boolean;
}

const CardStudy = ({
  study,
  isRequiredAppointment = false,
}: CardStudyProps) => {
  const {
    code,
    id,
    name,
    priceInfo,
    slug,
    description,
    preparation,
    isPanel,
  } = study;
  const sampleType = getCatalogName(study.sampleType);
  const section = getCatalogName(study.section);
  const fastingHours = getFastingHours(preparation);
  const [isInCart, setIsInCart] = useState(false);

  const checkCartStatus = () => {
    const cart = getCart();
    setIsInCart(cart.some((s) => s.id === id));
  };

  useEffect(() => {
    checkCartStatus();
    window.addEventListener(CART_UPDATED_EVENT, checkCartStatus);
    window.addEventListener("storage", checkCartStatus);
    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, checkCartStatus);
      window.removeEventListener("storage", checkCartStatus);
    };
  }, [id]);

  const handleAction = () => {
    if (isInCart) {
      removeFromCart(id);
    } else {
      addToCart(study);
    }
  };

  return (
    <div className="group relative flex h-full w-full max-w-sm flex-col overflow-hidden rounded-clinical-md border border-ui-border bg-white shadow-xs transition-[border-color,box-shadow] duration-200 hover:border-brand-ink/30 hover:shadow-sm motion-reduce:transition-none">
      {/* Header Badges */}
      <div className="p-6 pb-4 flex flex-wrap justify-between items-start gap-2">
        <StudyCode code={code} />
        {isPanel && <PanelBadge />}
        {sampleType && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-clinical-sm text-2xs font-bold uppercase tracking-wider bg-yellow-secondary/8 text-yellow-ink border border-yellow-secondary/15 shadow-xs">
            <span>{sampleType}</span>
          </div>
        )}
      </div>

      <div className="px-6 grow flex flex-col">
        {section && (
          <p className="mb-1.5 text-2xs font-bold uppercase tracking-wider text-ink-subtle">
            {section}
          </p>
        )}

        {/* Title */}
        <h5
          title={name}
          className="mb-3 text-xl font-bold tracking-tight text-ink leading-tight group-hover:text-brand-ink transition-colors duration-300 line-clamp-2 min-h-14"
        >
          {name}
        </h5>

        {/* Requirements */}
        {isRequiredAppointment && (
          <div className="flex items-center gap-2 mb-4 text-red-custom font-bold text-2xs uppercase tracking-wider bg-red-custom/5 w-fit px-3 py-1 rounded-clinical-sm">
            <Calendar className="w-3 h-3" />
            <span>Requiere cita</span>
          </div>
        )}

        {/* Description */}
        <div className="mb-6 grow">
          {description && (
            <p className="text-sm text-ink-muted line-clamp-3 leading-relaxed mb-4">
              {description}
            </p>
          )}

          {/* Meta Info */}
          {preparation && (
          <div className="flex flex-col gap-3 py-4 border-y border-ui-border/80">
            {fastingHours && (
              <div className="flex items-center gap-3 text-xs font-bold text-ink-muted">
                <div className="p-1.5 rounded-clinical-sm bg-yellow-primary/10 text-yellow-ink">
                  <Timer className="w-4 h-4" />
                </div>
                <span>
                  Ayuno:{" "}
                  <span className="text-ink font-bold">
                    {fastingHours} h
                  </span>
                </span>
              </div>
            )}
            {preparation && (
              <div className="flex items-start gap-3 text-xs font-bold text-ink-muted">
                <div className="p-1.5 rounded-clinical-sm bg-green-light/8 text-ink">
                  <FlaskConical className="w-4 h-4" />
                </div>
                <span className="line-clamp-2 font-semibold leading-relaxed" title={preparation}>
                  {preparation}
                </span>
              </div>
            )}
          </div>
          )}

          {isPanel && (
            <div className="mt-4">
              <PanelParameters studyId={id} />
            </div>
          )}
        </div>

        {/* Price Section */}
        <div className="mb-6">
          {priceInfo?.showPrice ? (
            <Price value={priceInfo.price} size="lg" />
          ) : (
            <div className="py-2 px-4 rounded-clinical-md bg-ui-bg border border-ui-border w-fit">
              <span className="text-2xs font-bold text-ink uppercase tracking-widest">
                {priceInfo?.message ?? "Consulte en sucursal"}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="p-6 pt-0 mt-auto grid grid-cols-2 gap-3">
        <NavLinkButton
          path={`/study/${slug}`}
          text="Detalles"
          variant="ghost"
          size="md"
          width="full"
        />

        <Button
          type="button"
          size="md"
          width="full"
          onClick={handleAction}
          variant={isInCart ? "danger" : "primary"}
          text={isInCart ? "Eliminar" : "Agregar"}
          icon={isInCart ? "lucide:trash-2" : "lucide:shopping-cart"}
        />
      </div>
    </div>
  );
};

export default CardStudy;
