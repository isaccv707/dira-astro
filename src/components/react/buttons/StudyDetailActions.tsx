import React from "react";
import { useQuoterContext } from "../../../hooks/useQuoterContext";
import useDrawerManager from "../../../hooks/useDrawerManager";
import type { Study } from "../../../interfaces/study.interface";
import { ShoppingCart, CheckCircle2, Trash2 } from "lucide-react";
import Button from "./Button";

interface StudyDetailActionsProps {
  study: Study;
}

const StudyDetailActions = ({ study }: StudyDetailActionsProps) => {
  const { addStudy, removeStudy, selectedStudies } = useQuoterContext();
  const { open } = useDrawerManager();

  const isAlreadyInCart = selectedStudies.some((s) => s.id === study.id);

  const handleAddToCart = () => {
    addStudy(study);
    open("STUDIES_DRAWER", {
      title: "Estudios Seleccionados",
      data: [],
    });
  };

  const handleRemoveFromCart = () => {
    removeStudy(study.id);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
        <div className="flex items-end gap-1 mb-6 justify-center">
          <span className="text-sm font-bold text-grey mb-1">$</span>
          <span className="text-4xl font-black text-green-light tracking-tight">
            {study.price.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
          </span>
          <span className="text-xs font-bold text-green-light mb-1 ml-1 uppercase">
            MXN
          </span>
        </div>

        <div className="space-y-3">
          <Button
            type="button"
            variant={isAlreadyInCart ? "secondary" : "primary"}
            size="lg"
            width="full"
            onClick={isAlreadyInCart ? handleRemoveFromCart : handleAddToCart}
            text={
              isAlreadyInCart ? "En la cotización" : "Agregar a la cotización"
            }
            icon={
              isAlreadyInCart ? (
                <CheckCircle2 className="w-5 h-5 ml-2" />
              ) : (
                <ShoppingCart className="w-5 h-5 ml-2" />
              )
            }
          />

          {isAlreadyInCart && (
            <button
              onClick={handleRemoveFromCart}
              className="w-full flex items-center justify-center gap-2 py-2 text-sm font-semibold text-red hover:text-red/80 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Remover del carrito
            </button>
          )}
        </div>
      </div>

      <div className="bg-greenSecondary/5 p-6 rounded-[2rem] border border-greenSecondary/10">
        <h4 className="font-bold text-black mb-2 text-sm uppercase tracking-wider">
          ¿Tienes dudas?
        </h4>
        <p className="text-xs text-grey mb-4">
          Si necesitas más información sobre este estudio o quieres agendar una
          cita directamente.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center text-sm font-bold text-greenPrimary hover:underline"
        >
          Habla con un asesor →
        </a>
      </div>
    </div>
  );
};

export default StudyDetailActions;
