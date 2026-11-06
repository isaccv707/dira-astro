// Pulls "8" or "8–12" out of free-text preparation. Accepts the ways the lab
// writes it: "ayuno mínimo de 8 horas", "Ayuno de 8hrs.", "Ayuno 8 hrs",
// "ayuno de 8 a 12 h".
export const getFastingHours = (preparation?: string | null) => {
  const match = preparation?.match(
    /ayuno\s+(?:m[ií]nimo\s+)?(?:de\s+)?(\d+(?:\s*(?:a|-|–)\s*\d+)?)\s*h/i,
  );
  return match ? match[1].replace(/\s*(?:a|-|–)\s*/, "–") : null;
};
