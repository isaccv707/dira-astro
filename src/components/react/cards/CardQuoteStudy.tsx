import Price from "../ui/Price";
import { FlaskConical, Timer } from "lucide-react";
import {
  getCatalogName,
  type Study,
} from "../../../interfaces/study.interface";
import { getFastingHours } from "../../../utils/studyPreparation";
import AddStudyButton from "../buttons/AddStudyButton";
import PanelBadge from "../panel/PanelBadge";

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
  const section = getCatalogName(study.section);
  const sampleType = getCatalogName(study.sampleType);
  const fastingHours = getFastingHours(study.preparation);

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
        {/* Code · section, profile badge */}
        <div className="flex items-center justify-between gap-2">
          <span className="min-w-0 truncate text-2xs font-bold uppercase tracking-wider text-ink-subtle">
            <span className="font-mono">{study.code}</span>
            {section && ` · ${section}`}
          </span>
          {study.isPanel && <PanelBadge />}
        </div>

        {/* Name */}
        <h3
          className={`text-sm sm:text-[15px] font-semibold leading-snug line-clamp-2 min-h-10 ${
            hasPrice ? "text-ink" : "text-ink-muted"
          }`}
          title={study.name}
        >
          {study.name}
        </h3>

        {study.description && (
          <p
            className="text-xs leading-relaxed text-ink-muted line-clamp-2"
            title={study.description}
          >
            {study.description}
          </p>
        )}

        {/* Sample + preparation */}
        {(sampleType || study.preparation) && (
          <div className="flex flex-wrap items-center gap-1.5">
            {sampleType && (
              <span className="inline-flex items-center gap-1 rounded-clinical-sm bg-ui-bg px-2 py-1 text-2xs font-semibold text-ink-muted">
                <FlaskConical className="h-3 w-3 text-ink" />
                {sampleType}
              </span>
            )}
            {fastingHours ? (
              <span
                className="inline-flex items-center gap-1 rounded-clinical-sm bg-yellow-primary/10 px-2 py-1 text-2xs font-bold text-yellow-ink"
                title={study.preparation ?? undefined}
              >
                <Timer className="h-3 w-3" />
                Ayuno {fastingHours} h
              </span>
            ) : (
              study.preparation && (
                <span
                  className="inline-flex min-w-0 items-center gap-1 rounded-clinical-sm bg-ui-bg px-2 py-1 text-2xs font-semibold text-ink-muted"
                  title={study.preparation}
                >
                  <Timer className="h-3 w-3 shrink-0 text-ink" />
                  <span className="truncate">{study.preparation}</span>
                </span>
              )
            )}
          </div>
        )}

        {/* Price zone — pushed down so prices align across the row */}
        <div className="mt-auto min-h-12 flex items-center">
          {hasPrice ? (
            <Price value={study.priceInfo.price} size="md" />
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-ui-bg px-3 py-1.5 text-2xs font-semibold text-ink-muted leading-tight max-w-full">
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
            className={`text-2xs font-semibold ${
              isAdded && hasPrice ? "text-ink" : "text-ink-muted"
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
