import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

/**
 * Parses a stat string like "3+", "15+", "1+" or "—" into:
 *   { target, prefix, suffix, numeric }
 * Non-numeric values (e.g. "—") are returned as-is with numeric = false.
 */
const parseStat = (value) => {
	const str = String(value).trim();
	const match = str.match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);
	if (!match) {
		return { numeric: false, raw: str };
	}
	return {
		numeric: true,
		prefix: match[1] || "",
		target: parseFloat(match[2]),
		suffix: match[3] || "",
	};
};

/**
 * Animates a number counting up from 0 → target when it scrolls into view.
 * Returns { ref, display } — attach ref to the element and render display.
 */
export const useCountUp = (value, { duration = 1600 } = {}) => {
	const parsed = parseStat(value);
	const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });
	const [display, setDisplay] = useState(parsed.numeric ? `${parsed.prefix}0${parsed.suffix}` : parsed.raw);
	const frameRef = useRef();

	useEffect(() => {
		if (!parsed.numeric) {
			setDisplay(parsed.raw);
			return;
		}
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
			if (progress < 1) {
				frameRef.current = requestAnimationFrame(tick);
			}
		};

		frameRef.current = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frameRef.current);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inView]);

	return { ref, display };
};

export default useCountUp;
