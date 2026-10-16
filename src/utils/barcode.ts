export interface BarcodeBar {
  x: number;
  width: number;
}

// Decorative, deterministic bar pattern derived from a study code — not a
// scannable symbology. Same code always draws the same label.
export const buildBarcode = (value: string, minUnits = 96) => {
  const bars: BarcodeBar[] = [];
  let x = 0;

  const push = (width: number, gap: number) => {
    bars.push({ x, width });
    x += width + gap;
  };

  // Start guard
  push(1, 1);
  push(1, 2);

  const source = value || "DYRA";
  let i = 0;
  while (x < minUnits || i < source.length) {
    const c = source.charCodeAt(i % source.length) + Math.floor(i / source.length) * 7;
    push(1 + (c % 3), 1 + ((c >> 1) % 2));
    push(1 + ((c >> 2) % 2), 1 + ((c >> 3) % 3));
    i += 1;
  }

  // Stop guard
  push(2, 1);
  push(1, 0);

  return { bars, width: x };
};
