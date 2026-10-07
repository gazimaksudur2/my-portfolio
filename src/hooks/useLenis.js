import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Module-level reference so other components can call scrollTo.
let lenisInstance = null;

export function getLenis() {
	return lenisInstance;
}

export function scrollToSection(sectionId) {
	const el = document.querySelector(sectionId);
	if (!el) return;
	const navbarHeight = 80;
	if (lenisInstance) {
		lenisInstance.scrollTo(el, { offset: -navbarHeight, duration: 1.2 });
	} else {
		window.scrollTo({ top: el.offsetTop - navbarHeight, behavior: "smooth" });
	}
}

export function useLenis() {
	useEffect(() => {
		// On every fresh page load, snap to the very top before Lenis boots.
		// This prevents the browser from restoring a previous scroll position
		// or a stale hash anchor (e.g. #projects) from jumping mid-page.
		window.history.replaceState(null, "", window.location.pathname);
		window.scrollTo(0, 0);

		const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		const lenis = new Lenis({
			lerp: prefersReduced ? 1 : 0.1,
			smoothWheel: !prefersReduced,
		});

		lenisInstance = lenis;

		lenis.on("scroll", ScrollTrigger.update);

		gsap.ticker.add((time) => {
			lenis.raf(time * 1000);
		});
		gsap.ticker.lagSmoothing(0);

		return () => {
			lenis.destroy();
			lenisInstance = null;
		};
	}, []);
}
