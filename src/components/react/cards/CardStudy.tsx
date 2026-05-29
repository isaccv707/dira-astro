import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  FlaskConical,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import NavLinkButton from "../navigation/NavLinkButton";
import Button from "../ui/Button";
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
    price,
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
    <div className="group relative max-w-sm w-full bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-green-primary/10 transition-all duration-500 flex flex-col overflow-hidden h-full">
      <div className="p-6 pb-0 flex justify-between items-start gap-2">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-green-light/10 text-green-light border border-green-light/20">
          ID: {code}
        </span>
        {sampleType && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-yellow-secondary/10 text-yellow-secondary border border-yellow-secondary/20">
            {sampleType}
          </span>
        )}
      </div>

      <div className="p-6 flex-grow">
        <h5
          title={name}
          className="mb-3 text-xl font-bold text-black leading-tight group-hover:text-green-primary transition-colors duration-300 line-clamp-2"
        >
          {name}
        </h5>

        {isRequiredAppointment && (
          <div className="flex items-center gap-2 mb-4 text-red font-bold text-xs uppercase tracking-wide">
            <Calendar className="w-4 h-4" />
            <span>Requiere cita</span>
          </div>
        )}

        <div className="space-y-4 mb-6">
          {description && (
            <p className="text-sm text-grey line-clamp-3 leading-relaxed">
              {description}
            </p>
          )}

          <div className="flex flex-wrap gap-x-5 gap-y-3 pt-4 border-t border-gray-50">
            <div className="flex items-center gap-2 text-xs font-semibold text-grey">
              <Clock className="w-4 h-4 text-green-secondary" />
              <span>
                Entrega: <span className="text-black">{deliveryTime} hrs</span>
              </span>
            </div>
            {preparation && (
              <div className="flex items-center gap-2 text-xs font-semibold text-grey">
                <FlaskConical className="w-4 h-4 text-green-secondary" />
                <span className="truncate max-w-[130px]">
                  Prep: <span className="text-black">{preparation}</span>
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-end gap-1 mb-6">
          <span className="text-sm font-bold text-grey mb-1">$</span>
          <span className="text-3xl font-black text-green-light tracking-tight">
            {price.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
          </span>
          <span className="text-xs font-bold text-green-light mb-1 ml-1 uppercase">
            MXN
          </span>
        </div>
      </div>

      <div className="p-6 pt-0 mt-auto grid grid-cols-2 gap-4">
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
          icon={
            isInCart ? (
              <Trash2 className="w-4 h-4" />
            ) : (
              <ShoppingCart className="w-4 h-4" />
            )
          }
        />
      </div>
    </div>
  );
};

export default CardStudy;
