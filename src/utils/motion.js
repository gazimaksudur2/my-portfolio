// Reusable Framer Motion variants for scroll-triggered entrance animations.

export const fadeInUp = {
	hidden: { opacity: 0, y: 40 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
	},
};

export const fadeIn = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { duration: 0.6 } },
};

export const fadeInLeft = {
	hidden: { opacity: 0, x: -50 },
	visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeInRight = {
	hidden: { opacity: 0, x: 50 },
	visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const scaleIn = {
	hidden: { opacity: 0, scale: 0.85 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
	},
};

export const staggerContainer = (stagger = 0.12, delayChildren = 0.05) => ({
	hidden: {},
	visible: {
		transition: {
			staggerChildren: stagger,
			delayChildren,
		},
	},
});

// Common viewport config so animations fire once when ~20% visible.
export const viewportOnce = { once: true, amount: 0.2 };
