import { type ReactNode } from "react";
import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  motion,
} from "framer-motion";

interface StatItem {
  label: string;
  value: string | number;
  suffix?: string;
  description: string;
}

interface CounterProps {
  value: string | number;
  suffix?: string;
}

const Counter = ({ value, suffix = "" }: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // MotionValue inicializado en 0
  const count = useMotionValue(0);

  // Transformamos el valor numérico a un string con formato (comas)
  const rounded = useTransform(count, (latest: number) => {
    return Math.round(latest).toLocaleString("en-US");
  });

  useEffect(() => {
    if (isInView) {
      // Sanitizamos el valor para asegurar que sea un número antes de animar
      const numericValue =
        typeof value === "number"
          ? value
          : parseInt(value.replace(/\D/g, ""), 10);

      const controls = animate(count, numericValue, {
        duration: 2,
        ease: "easeOut",
      });

      return controls.stop;
    }
  }, [isInView, count, value]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

export default Counter;
