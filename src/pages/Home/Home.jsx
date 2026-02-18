import { useState, useEffect } from "react";
import { FiArrowUp } from "react-icons/fi";
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
// import UnderConstruction from './UnderConstruction';

const Home = () => {
	const [showBackToTop, setShowBackToTop] = useState(false);

	useEffect(() => {
		trackVisitor();

		const handleScroll = () => {
			// Show button when user has scrolled more than 400px
			setShowBackToTop(window.scrollY > 400);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<div>
			<Navbar />
			{/* <UnderConstruction /> */}
			<main className="pt-16 lg:pt-20">
				{" "}
				{/* Account for fixed navbar */}
				<Banner />
				<AboutMe />
				<MySkills />
				<Services />
				<Projects />
				<Certifications />
				<Education />
				<Achievements />
				<Connect />
			</main>
			<Footer />

			{/* Floating Back to Top Button */}
			<button
				onClick={scrollToTop}
				className={`fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 ${
					showBackToTop
						? "translate-y-0 opacity-100"
						: "translate-y-16 opacity-0 pointer-events-none"
				}`}
				aria-label="Back to top"
			>
				<FiArrowUp className="w-5 h-5" />
			</button>
		</div>
	);
};

export default Home;
