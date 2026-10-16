// Pulls "8" or "8–12" out of free-text preparation ("ayuno mínimo de 8 horas").
export const getFastingHours = (preparation?: string | null) => {
  const match = preparation?.match(
    /ayuno\s+(?:m[ií]nimo\s+)?de\s+(\d+(?:\s*(?:a|-)\s*\d+)?)\s*h/i,
  );
  return match ? match[1].replace(/\s*(?:a|-)\s*/, "–") : null;
};
