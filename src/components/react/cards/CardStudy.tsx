import { useState, useEffect } from "react";
import {
  Clock,
  FlaskConical,
  Calendar,
  ShoppingCart,
  Trash2,
  ArrowRight,
  ClipboardList,
} from "lucide-react";

import NavLinkButton from "../navigation/NavLinkButton";
import Button from "../buttons/Button";
import type { Study } from "../../../interfaces/study.interface";
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
    deliveryTime,
    id,
    name,
    priceInfo,
    slug,
    description,
    preparation,
    sampleType,
  } = study;
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
    <div className="group relative max-w-sm w-full bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-green-primary/15 hover:-translate-y-1 transition-all duration-500 flex flex-col overflow-hidden h-full">
      {/* Header Badges */}
      <div className="p-6 pb-4 flex flex-wrap justify-between items-start gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider bg-green-light/10 text-green-light border border-green-light/20 shadow-sm">
          <ClipboardList className="w-3 h-3" />
          <span>ID: {code}</span>
        </div>
        {sampleType && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider bg-yellow-secondary/10 text-yellow-secondary border border-yellow-secondary/20 shadow-sm">
            <span>{sampleType}</span>
          </div>
        )}
      </div>

      <div className="px-6 grow flex flex-col">
        {/* Title */}
        <h5
          title={name}
          className="mb-3 text-xl font-extrabold text-black leading-tight group-hover:text-green-primary transition-colors duration-300 line-clamp-2 min-h-[3.5rem]"
        >
          {name}
        </h5>

        {/* Requirements */}
        {isRequiredAppointment && (
          <div className="flex items-center gap-2 mb-4 text-red font-bold text-[10px] uppercase tracking-wider bg-red/5 w-fit px-3 py-1 rounded-lg">
            <Calendar className="w-3 h-3" />
            <span>Requiere cita</span>
          </div>
        )}

        {/* Description */}
        <div className="mb-6 grow">
          {description && (
            <p className="text-sm text-grey line-clamp-3 leading-relaxed mb-4">
              {description}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex flex-col gap-3 py-4 border-y border-gray-50/80">
            <div className="flex items-center gap-3 text-xs font-bold text-grey">
              <div className="p-1.5 rounded-lg bg-green-light/5 text-green-light">
                <Clock className="w-4 h-4" />
              </div>
              <span>
                Resultados en:{" "}
                <span className="text-black font-black">
                  {deliveryTime} hrs
                </span>
              </span>
            </div>
            {preparation && (
              <div className="flex items-center gap-3 text-xs font-bold text-grey">
                <div className="p-1.5 rounded-lg bg-green-light/5 text-green-light">
                  <FlaskConical className="w-4 h-4" />
                </div>
                <span className="line-clamp-1">
                  Prep:{" "}
                  <span className="text-black font-black">{preparation}</span>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Price Section */}
        <div className="mb-6">
          {priceInfo?.showPrice ? (
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-black text-grey">$</span>
              <span className="text-4xl font-black text-green-light tracking-tighter">
                {priceInfo.price.toLocaleString("es-MX", {
                  minimumFractionDigits: 2,
                })}
              </span>
              <span className="text-[10px] font-black text-green-light/60 uppercase tracking-widest ml-1">
                MXN
              </span>
            </div>
          ) : (
            <div className="py-2 px-4 rounded-2xl bg-gray-50 border border-gray-100 w-fit">
              <span className="text-[10px] font-black text-green-light uppercase tracking-widest">
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
