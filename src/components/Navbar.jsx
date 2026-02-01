import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiCode } from "react-icons/fi";
import { navLinks, personalInfo } from "../constants";
// import { HashLink } from "react-router-hash-link/dist/react-router-hash-link.cjs.production";

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
					? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-neutral-200"
					: "bg-white/80 backdrop-blur-sm"
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
						<div className="p-2.5 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
							<FiCode className="w-6 h-6 text-white" />
						</div>
						<span className="text-lg lg:text-xl font-bold text-neutral-800 group-hover:text-primary-600 transition-colors duration-200">
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
											? "text-primary-600 bg-primary-50"
											: "text-neutral-700 hover:text-primary-600 hover:bg-primary-50"
									}`}
								>
									{link.label}
									<span
										className={`absolute bottom-0 left-0 h-0.5 bg-primary-500 transition-all duration-300 ${
											isActive
												? "w-full"
												: "w-0 group-hover:w-full"
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
							className="ml-4 px-6 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
						>
							Resume
						</a>
					</div>

					{/* Mobile menu button */}
					<div className="lg:hidden">
						<button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="p-2 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
							aria-label="Toggle mobile menu"
						>
							{isMobileMenuOpen ? (
								<HiX className="w-6 h-6" />
							) : (
								<HiMenuAlt3 className="w-6 h-6" />
							)}
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
					<div className="px-2 pt-2 pb-4 space-y-1 bg-white/95 backdrop-blur-lg border-t border-neutral-200 rounded-b-xl shadow-lg">
						{navLinks.map((link) => {
							const isActive = activeSection === link.to.slice(1);
							return (
								<button
									key={link.to}
									onClick={() => scrollToSection(link.to)}
									className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
										isActive
											? "text-primary-600 bg-primary-50"
											: "text-neutral-700 hover:text-primary-600 hover:bg-primary-50"
									}`}
								>
									{link.label}
								</button>
							);
						})}
						<div className="pt-2 border-t border-neutral-200">
							<a
								href={personalInfo.resumeLink}
								target="_blank"
								rel="noopener noreferrer"
								className="block w-full text-center px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200"
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
