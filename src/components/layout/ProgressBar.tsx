"use client";

/**
 * Scroll progress bar.
 * Uses a framer-motion spring driven by scrollYProgress.
 */
import { useScroll, useSpring, m } from "framer-motion";

const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <m.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none"
      aria-hidden="true"
    >
      <div className="w-full h-full bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-cyan" />
    </m.div>
  );
};

export default ProgressBar;
