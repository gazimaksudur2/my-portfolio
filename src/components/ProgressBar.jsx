import { useScroll, useSpring, motion } from "framer-motion";

const ProgressBar = () => {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

	return (
		<motion.div
			style={{ scaleX, transformOrigin: "left" }}
			className="fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none"
			aria-hidden="true"
		>
			<div className="w-full h-full bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-cyan" />
		</motion.div>
	);
};

export default ProgressBar;
