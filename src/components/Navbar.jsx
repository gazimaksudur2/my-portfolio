import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiCode } from "react-icons/fi";
import { navLinks, personalInfo } from "../constants";

const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState("");

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);

			// Detect active section
			const sections = navLinks.map((link) => link.to.slice(1));
			const scrollPosition = window.scrollY + 100; // Offset for navbar

			for (let i = sections.length - 1; i >= 0; i--) {
				const section = document.getElementById(sections[i]);
				if (section && section.offsetTop <= scrollPosition) {
					setActiveSection(sections[i]);
					break;
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll(); // Call on mount

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToSection = (sectionId) => {
		const element = document.querySelector(sectionId);
		if (element) {
			const navbarHeight = 80; // Account for navbar height
			const elementPosition = element.offsetTop - navbarHeight;

			window.scrollTo({
				top: elementPosition,
				behavior: "smooth",
			});
		}
		setIsMobileMenuOpen(false);
	};

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
		setActiveSection("");
	};

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				isScrolled
					? "backdrop-blur-md bg-black/40 border-b border-accent-cyan/15 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
					: "backdrop-blur-md bg-black/20 border-b border-white/5"
			}`}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16 lg:h-20">
					{/* Logo + Name */}
					<Link
						to={"/"}
						className="flex items-center space-x-3 group cursor-pointer"
						onClick={scrollToTop}
						aria-label="Home"
					>
						<div className="p-2.5 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20 border border-accent-cyan/30 shadow-glow-cyan group-hover:shadow-glow-cyan-lg transition-all duration-300 group-hover:scale-105">
							<FiCode className="w-6 h-6 text-accent-cyan" />
						</div>
						<span className="flex lg:hidden xl:flex text-lg lg:text-xl font-bold font-syne text-content-primary group-hover:text-accent-cyan group-hover:glow-cyan transition-all duration-200">
							{personalInfo.name}
						</span>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden lg:flex items-center">
						<div className="flex items-center">
							{navLinks.map((link) => {
								const isActive = activeSection === link.to.slice(1);
								return (
									<button
										key={link.to}
										onClick={() => scrollToSection(link.to)}
										className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative group ${
											isActive
												? "text-accent-cyan"
												: "text-content-muted hover:text-content-primary"
										}`}
									>
										{link.label}
										<span
											className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-gradient-to-r from-accent-cyan to-accent-violet shadow-glow-cyan transition-all duration-300 ${
												isActive ? "w-2/3" : "w-0 group-hover:w-2/3"
											}`}
										></span>
									</button>
								);
							})}
						</div>
						<a
							href={personalInfo.resumeLink}
							target="_blank"
							rel="noopener noreferrer"
							className="ml-4 px-6 py-2.5 text-sm font-semibold rounded-lg text-accent-cyan border border-accent-cyan/40 bg-accent-cyan/5 hover:bg-accent-cyan/15 hover:shadow-glow-cyan transition-all duration-300 transform hover:-translate-y-0.5"
						>
							Resume
						</a>
					</div>

					{/* Mobile menu button */}
					<div className="lg:hidden">
						<button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="relative p-2 text-content-primary hover:text-accent-cyan rounded-lg border border-white/5 hover:border-accent-cyan/30 transition-all duration-200"
							aria-label="Toggle mobile menu"
						>
							<span
								className={`block transition-all duration-300 ${
									isMobileMenuOpen ? "rotate-180 opacity-100" : "rotate-0"
								}`}
							>
								{isMobileMenuOpen ? (
									<HiX className="w-6 h-6" />
								) : (
									<HiMenuAlt3 className="w-6 h-6" />
								)}
							</span>
						</button>
					</div>
				</div>

				{/* Mobile Navigation */}
				<div
					className={`lg:hidden transition-all duration-300 ${
						isMobileMenuOpen
							? "max-h-96 opacity-100"
							: "max-h-0 opacity-0 overflow-hidden"
					}`}
				>
					<div className="px-2 pt-2 pb-4 space-y-1 backdrop-blur-xl bg-black/60 border-t border-accent-cyan/15 rounded-b-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
						{navLinks.map((link) => {
							const isActive = activeSection === link.to.slice(1);
							return (
								<button
									key={link.to}
									onClick={() => scrollToSection(link.to)}
									className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
										isActive
											? "text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20"
											: "text-content-muted hover:text-content-primary hover:bg-white/5"
									}`}
								>
									{link.label}
								</button>
							);
						})}
						<div className="pt-2 border-t border-white/10">
							<a
								href={personalInfo.resumeLink}
								target="_blank"
								rel="noopener noreferrer"
								className="block w-full text-center px-4 py-3 font-semibold rounded-lg text-accent-cyan border border-accent-cyan/40 bg-accent-cyan/5 hover:bg-accent-cyan/15 hover:shadow-glow-cyan transition-all duration-300"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Download Resume
							</a>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
