import clsx from "clsx";
import { formatMXNAmount } from "../../../utils/currency";

interface PriceProps {
  // priceInfo.price is nullable in the API; callers render Price only when showPrice.
  value: number | string | null;
  size?: "sm" | "md" | "lg";
  /** "onFill": all parts in black-custom, for use on yellow/green brand fills. */
  tone?: "default" | "onFill";
  className?: string;
}

const AMOUNT_SIZE = {
  sm: "text-base",
  md: "text-2xl",
  lg: "text-3xl",
} as const;

/** "$ 1,250.00 MXN" with aligned digits. Renders statically from Astro too. */
const Price = ({ value, size = "md", tone = "default", className }: PriceProps) => {
  const onFill = tone === "onFill";
  return (
    <span
      className={clsx(
        "inline-flex items-baseline gap-1",
        onFill ? "text-black-custom" : "text-ink",
        className,
      )}
    >
      <span className={clsx("text-sm font-semibold", !onFill && "text-ink-muted")}>$</span>
      <span className={clsx("font-bold tracking-tight tabular-nums", AMOUNT_SIZE[size])}>
        {formatMXNAmount(value)}
      </span>
      <span
        className={clsx(
          "ml-0.5 text-2xs font-semibold uppercase tracking-wide",
          !onFill && "text-ink-subtle",
        )}
      >
        MXN
      </span>
    </span>
  );
};

export default Price;
