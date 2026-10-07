import { useEffect, useRef, useState } from "react";

/**
 * Custom magnetic cursor: a small dot + a lagging ring.
 * Uses mix-blend-difference so it inverts against any background.
 * Automatically hidden on touch devices and when prefers-reduced-motion is set.
 */
const MagneticCursor = () => {
	const dotRef = useRef(null);
	const ringRef = useRef(null);
	const [state, setState] = useState("default"); // "default" | "link"
	const pos = useRef({ x: -200, y: -200 });
	const ring = useRef({ x: -200, y: -200 });
	const rafId = useRef(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const isTouch = window.matchMedia("(hover: none)").matches;
		const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (isTouch || prefersReduced) return;

		setVisible(true);

		const onMove = (e) => {
			pos.current = { x: e.clientX, y: e.clientY };
		};

		const onEnter = () => setState("link");
		const onLeave = () => setState("default");

		window.addEventListener("mousemove", onMove);

		const attachListeners = () => {
			document.querySelectorAll("a, button, [role='button'], [tabindex]").forEach((el) => {
				el.addEventListener("mouseenter", onEnter);
				el.addEventListener("mouseleave", onLeave);
			});
		};

		attachListeners();

		const animate = () => {
			if (dotRef.current) {
				dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
			}
			ring.current.x += (pos.current.x - ring.current.x) * 0.1;
			ring.current.y += (pos.current.y - ring.current.y) * 0.1;
			if (ringRef.current) {
				const size = state === "link" ? 24 : 18;
				ringRef.current.style.transform = `translate(${ring.current.x - size / 2}px, ${ring.current.y - size / 2}px)`;
			}
			rafId.current = requestAnimationFrame(animate);
		};
		rafId.current = requestAnimationFrame(animate);

		return () => {
			window.removeEventListener("mousemove", onMove);
			if (rafId.current) cancelAnimationFrame(rafId.current);
		};
	}, [state]);

	if (!visible) return null;

	return (
		<>
			{/* Core dot – mix-blend inverts it against any surface */}
			<div
				ref={dotRef}
				className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference will-change-transform"
				aria-hidden="true"
			>
				<div
					className="rounded-full bg-white transition-all duration-150"
					style={{ width: state === "link" ? 10 : 8, height: state === "link" ? 10 : 8 }}
				/>
			</div>

			{/* Lagging ring */}
			<div
				ref={ringRef}
				className="fixed top-0 left-0 z-[9998] pointer-events-none will-change-transform"
				aria-hidden="true"
			>
				<div
					className="rounded-full border transition-all duration-300"
					style={{
						width: state === "link" ? 40 : 28,
						height: state === "link" ? 40 : 28,
						borderColor: state === "link" ? "#00f5ff" : "rgba(0,245,255,0.5)",
						boxShadow: state === "link" ? "0 0 10px rgba(0,245,255,0.5)" : "none",
					}}
				/>
			</div>
		</>
	);
};

export default MagneticCursor;
