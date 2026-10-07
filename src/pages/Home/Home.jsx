import { useState, useEffect } from "react";
import { FiArrowUp } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../shared/Footer";
import AboutMe from "./AboutMe";
import Achievements from "./Achievements";
import Banner from "./Banner";
import Certifications from "./Certifications";
import Connect from "./Connect";
import Education from "./Education";
import MySkills from "./MySkills";
import Projects from "./Projects";
import Services from "./Services";
import { trackVisitor } from "../../services/visitorStats";
import Experience from "./Experience";
import ProgressBar from "../../components/ProgressBar";
import SectionDots from "../../components/SectionDots";
import MagneticCursor from "../../components/MagneticCursor";
import CommandPalette from "../../components/CommandPalette";
import { useLenis } from "../../hooks/useLenis";

const Home = () => {
	const [showBackToTop, setShowBackToTop] = useState(false);

	// Initialise Lenis smooth scroll + GSAP ScrollTrigger bridge
	useLenis();

	useEffect(() => {
		trackVisitor();

		// Activate custom-cursor class so CSS hides the native pointer
		document.body.classList.add("custom-cursor");

		const handleScroll = () => {
			setShowBackToTop(window.scrollY > 400);
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
			document.body.classList.remove("custom-cursor");
		};
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div>
			{/* Custom cursor (desktop only, touch / reduced-motion aware) */}
			<MagneticCursor />

			{/* Scroll progress bar */}
			<ProgressBar />

			{/* Right-side section dot navigator */}
			<SectionDots />

			{/* Cmd+K command palette */}
			<CommandPalette />

			<Navbar />

			<main className="pt-16 lg:pt-20">
				<Banner />
				<AboutMe />
				<Experience />
				<MySkills />
				<Services />
				<Projects />
				<Certifications />
				<Education />
				<Achievements />
				<Connect />
			</main>

			<Footer />

			{/* Back-to-top button — properly themed */}
			<AnimatePresence>
				{showBackToTop && (
					<motion.button
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 16 }}
						transition={{ duration: 0.25 }}
						onClick={scrollToTop}
						className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-accent-cyan text-bg-primary shadow-glow-cyan hover:bg-accent-cyan/90 hover:shadow-glow-cyan-lg hover:-translate-y-1 transition-all duration-300"
						aria-label="Back to top"
					>
						<FiArrowUp className="w-5 h-5" />
					</motion.button>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Home;
