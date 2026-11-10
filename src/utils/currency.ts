const MXN_AMOUNT = new Intl.NumberFormat("es-MX", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** "1,250.00" — amount only, for layouts that render "$" and "MXN" apart. */
export const formatMXNAmount = (value: number | string | null | undefined) =>
  MXN_AMOUNT.format(Number(value ?? 0));

/** "$1,250.00" — compact form for lists and totals. */
export const formatMXN = (value: number | string | null | undefined) =>
  `$${formatMXNAmount(value)}`;
