import type { Study } from "../interfaces/study.interface";
import { getCatalogName } from "../interfaces/study.interface";
import { getFastingHours } from "./studyPreparation";

/** "Resultados el mismo día" / "en 1 día" / "en 3 días". `deliveryTime` is in days. */
export const formatDeliveryTime = (days?: number | null): string | null => {
  if (days === null || days === undefined || Number.isNaN(days)) return null;
  if (days <= 0) return "Resultados el mismo día";
  return `Resultados en ${days} ${days === 1 ? "día" : "días"}`;
};

/** Patient-facing facts shown on a study row, in reading order. */
export const getStudyFacts = (study: Study): string[] => {
  const fasting = getFastingHours(study.preparation);
  return [
    getCatalogName(study.sampleType),
    fasting ? `Ayuno de ${fasting} h` : null,
    formatDeliveryTime(study.deliveryTime),
  ].filter((fact): fact is string => Boolean(fact));
};
