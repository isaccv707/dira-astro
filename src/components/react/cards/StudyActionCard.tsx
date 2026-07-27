import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import type { Study } from "../../../interfaces/study.interface";
import {
  addToCart,
  removeFromCart,
  getCart,
  CART_UPDATED_EVENT,
} from "../../../utils/cart";
import Button from "../buttons/Button";
import NavLinkButton from "../navigation/NavLinkButton";

interface StudyActionCardProps {
  study: Study;
}

const StudyActionCard = ({ study }: StudyActionCardProps) => {
  const { id, priceInfo } = study;
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const checkCartStatus = () =>
      setIsInCart(getCart().some((s) => s.id === id));

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
          variant={isInCart ? "danger" : "primary"}
          width="full"
          size="lg"
          text={isInCart ? "Quitar del cotizador" : "Agregar al cotizador"}
          icon={isInCart ? "lucide:trash-2" : "lucide:shopping-cart"}
        />

        {isInCart && (
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
