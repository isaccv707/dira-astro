import type { Study } from "../../../interfaces/study.interface";
import AddStudyButton from "../buttons/AddStudyButton";

interface CardQuoteStudyProps {
  study: Study;
  isAdded: boolean;
  handleAddStudy: (study: Study) => void;
  handleDeletStudy: (studyId: string) => void;
}

const CardQuoteStudy = ({
  handleAddStudy,
  handleDeletStudy,
  isAdded,
  study,
}: CardQuoteStudyProps) => {
  const hasPrice = study.priceInfo?.showPrice === true;

  return (
    <div
      className={`
        relative flex flex-col h-full rounded-clinical-md bg-white
        border-l-4 ring-1 ring-black/5 shadow-xs
        transition-all duration-200 overflow-hidden
        ${
          hasPrice
            ? "border-l-green-light hover:-translate-y-0.5 hover:shadow-sm hover:ring-green-light/30"
            : "border-l-ui-border"
        }
      `}
    >
      {/* Body */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 gap-3">
        {/* Name */}
        <h3
          className={`text-sm sm:text-[15px] font-semibold leading-snug line-clamp-2 min-h-10 ${
            hasPrice ? "text-green-light" : "text-grey-custom"
          }`}
          title={study.name}
        >
          {study.name}
        </h3>

        {/* Price zone — fixed min-height so all cards align */}
        <div className="min-h-12 flex items-center">
          {hasPrice ? (
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-bold text-grey-custom">$</span>
              <span className="text-2xl font-black text-green-light tracking-tight">
                {study.priceInfo.price.toLocaleString("es-MX", {
                  minimumFractionDigits: 2,
                })}
              </span>
              <span className="text-[10px] font-bold text-green-light/60 uppercase tracking-widest ml-0.5">
                MXN
              </span>
            </div>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-ui-bg px-3 py-1.5 text-[11px] font-semibold text-grey-custom leading-tight max-w-full">
              <span className="h-1.5 w-1.5 rounded-full bg-ui-border shrink-0" />
              <span className="truncate">
                {study.priceInfo?.message ?? "Consulte en sucursal"}
              </span>
            </span>
          )}
        </div>

        {/* Status badge */}
        <div className="flex items-center gap-1.5">
          <span
            className={`h-1.5 w-1.5 rounded-full shrink-0 ${
              isAdded && hasPrice ? "bg-green-light" : "bg-ui-border"
            }`}
          />
          <span
            className={`text-[11px] font-semibold ${
              isAdded && hasPrice ? "text-green-light" : "text-grey-custom"
            }`}
          >
            {isAdded && hasPrice ? "Agregado a cotización" : "Disponible"}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-black/5 mx-0" />

      {/* Action */}
      <div
        className={`p-4 sm:p-5 pt-3 ${!hasPrice ? "pointer-events-none opacity-40" : ""}`}
      >
        <AddStudyButton
          isAdded={isAdded}
          handleAddStudy={handleAddStudy}
          handleDeletStudy={handleDeletStudy}
          study={study}
        />
      </div>
    </div>
  );
};

export default CardQuoteStudy;
