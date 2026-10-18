/**
 * Animates a number counting up when it enters the viewport.
 * Uses framer-motion's useInView — removes react-intersection-observer dependency.
 */
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const parseStat = (value) => {
  const str = String(value).trim();
  const match = str.match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);
  if (!match) return { numeric: false, raw: str };
  return {
    numeric: true,
    prefix: match[1] || '',
    target: parseFloat(match[2]),
    suffix: match[3] || '',
  };
};

export const useCountUp = (value, { duration = 1400 } = {}) => {
  const parsed = parseStat(value);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });
  const [display, setDisplay] = useState(
    parsed.numeric ? `${parsed.prefix}0${parsed.suffix}` : parsed.raw
  );
  const frameRef = useRef();

  useEffect(() => {
    if (!parsed.numeric) { setDisplay(parsed.raw); return; }
    if (!inView) return;

    let start;
    const isFloat = !Number.isInteger(parsed.target);

    const tick = (timestamp) => {
      if (start === undefined) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = parsed.target * eased;
      const shown = isFloat ? current.toFixed(1) : Math.round(current);
      setDisplay(`${parsed.prefix}${shown}${parsed.suffix}`);
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return { ref, display };
};

export default useCountUp;
