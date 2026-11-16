"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const parseStat = (value: string) => {
  const str = String(value).trim();
  const match = str.match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);
  if (!match) return { numeric: false as const, raw: str };
  return {
    numeric: true as const,
    prefix: match[1] || "",
    target: parseFloat(match[2]),
    suffix: match[3] || "",
  };
};

export const useCountUp = (value: string, { duration = 1400 } = {}) => {
  const parsed = parseStat(value);
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const [display, setDisplay] = useState(
    parsed.numeric ? `${parsed.prefix}0${parsed.suffix}` : parsed.raw
  );
  const frameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!parsed.numeric) {
      setDisplay(parsed.raw);
      return;
    }
    if (!inView) return;

    let start: number | undefined;
    const isFloat = !Number.isInteger(parsed.target);

    const tick = (timestamp: number) => {
      if (start === undefined) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = parsed.target * eased;
      const shown = isFloat ? current.toFixed(1) : Math.round(current);
      setDisplay(`${parsed.prefix}${shown}${parsed.suffix}`);
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [inView, duration, parsed]);

  return { ref, display };
};

export default useCountUp;
