/** "Resultados el mismo día" / "en 1 día" / "en 3 días". `deliveryTime` is in days. */
export const formatDeliveryTime = (days?: number | null): string | null => {
  if (days === null || days === undefined || Number.isNaN(days)) return null;
  if (days <= 0) return "Resultados el mismo día";
  return `Resultados en ${days} ${days === 1 ? "día" : "días"}`;
};
