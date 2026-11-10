import type { ReactNode } from "react";
import clsx from "clsx";
import {
  eyebrowDotStyles,
  eyebrowStyles,
  type EyebrowVariants,
} from "../../../styles/ui";

interface EyebrowProps extends EyebrowVariants {
  children: ReactNode;
  className?: string;
  dot?: boolean;
}

/** React twin of components/astro/ui/Eyebrow.astro. */
const Eyebrow = ({
  children,
  tone,
  live,
  dot = true,
  className,
}: EyebrowProps) => (
  <span className={clsx(eyebrowStyles({ tone }), className)}>
    {dot && <span aria-hidden="true" className={eyebrowDotStyles({ tone, live })} />}
    {children}
  </span>
);

export default Eyebrow;
