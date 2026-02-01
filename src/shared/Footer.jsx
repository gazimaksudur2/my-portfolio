import {
	FiCode,
	FiGithub,
	FiLinkedin,
	FiFacebook,
	FiMail,
	FiPhone,
	FiMapPin,
	FiHeart,
} from "react-icons/fi";
import { personalInfo, navLinks } from "../constants";

const Footer = () => {
	const scrollToSection = (sectionId) => {
		const element = document.querySelector(sectionId);
		if (element) {
			element.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	};

	const services = [
		"Frontend Development",
		"Backend Development",
		"Full Stack Solutions",
	];

	const contact = {
		email: "gazimaksudur2@gmail.com",
		phone: "+880 1903-219313",
		location: "Akhalia, Sylhet, Bangladesh",
	};

	const socialLinks = [
		{ icon: FiGithub, href: "https://github.com/gazimaksudur2", label: "GitHub", color: "hover:text-neutral-300" },
		{ icon: FiLinkedin, href: "https://www.linkedin.com/in/gazi-maksudur-rahman", label: "LinkedIn", color: "hover:text-primary-400" },
		{ icon: FiFacebook, href: "https://www.facebook.com/gazi.maksudur", label: "Facebook", color: "hover:text-primary-400" },
	];

	return (
		<footer className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white relative overflow-hidden">
			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
					{/* Brand Section */}
					<div className="lg:col-span-1">
						<div className="flex items-center space-x-3 mb-6">
							<div className="p-2 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl">
								<FiCode className="w-6 h-6 text-white" />
							</div>
							<h3 className="text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
								{personalInfo.name}
							</h3>
						</div>
						<p className="text-neutral-300 leading-relaxed mb-6">
							MERN Stack Developer building scalable web applications with React, Next.js, and modern tools. Open to new projects and opportunities.
						</p>
						<div className="flex space-x-4">
							{socialLinks.map((social, index) => {
								const IconComponent = social.icon;
								return (
									<a
										key={index}
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										className={`inline-flex p-2 bg-white/10 rounded-lg text-neutral-400 transition-all duration-300 hover:scale-110 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-neutral-900 ${social.color}`}
										aria-label={`${social.label} (opens in new tab)`}
									>
										<IconComponent className="w-5 h-5" />
									</a>
								);
							})}
						</div>
					</div>

					{/* Quick Links - aligned with navbar */}
					<div>
						<h4 className="text-lg font-semibold mb-6">Quick Links</h4>
						<ul className="space-y-3">
							{navLinks.map((link) => (
								<li key={link.to}>
									<button
										onClick={() => scrollToSection(link.to)}
										className="text-neutral-300 hover:text-primary-400 transition-colors duration-300 text-left"
									>
										{link.label}
									</button>
								</li>
							))}
						</ul>
					</div>

					{/* Services - matches Services section */}
					<div>
						<h4 className="text-lg font-semibold mb-6">Services</h4>
						<ul className="space-y-3">
							{services.map((service, index) => (
								<li key={index} className="text-neutral-300 text-sm">
									{service}
								</li>
							))}
						</ul>
					</div>

					{/* Contact - matches Connect section */}
					<div>
						<h4 className="text-lg font-semibold mb-6">Get in Touch</h4>
						<div className="space-y-4">
							<a
								href={`mailto:${contact.email}`}
								className="flex items-center space-x-3 text-neutral-300 hover:text-primary-400 transition-colors"
							>
								<FiMail className="w-4 h-4 text-primary-400 flex-shrink-0" />
								<span className="text-sm">{contact.email}</span>
							</a>
							<a
								href={`tel:${contact.phone.replace(/\s/g, "")}`}
								className="flex items-center space-x-3 text-neutral-300 hover:text-primary-400 transition-colors"
							>
								<FiPhone className="w-4 h-4 text-primary-400 flex-shrink-0" />
								<span className="text-sm">{contact.phone}</span>
							</a>
							<div className="flex items-center space-x-3 text-neutral-300">
								<FiMapPin className="w-4 h-4 text-primary-400 flex-shrink-0" />
								<span className="text-sm">{contact.location}</span>
							</div>
						</div>
						<button
							onClick={() => scrollToSection("#contact")}
							className="mt-6 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-medium rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-300"
						>
							Send a message
						</button>
					</div>
				</div>

				{/* Bottom Section */}
				<div className="border-t border-white/10 pt-8 mt-12">
					<div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
						<div className="flex items-center space-x-2 text-neutral-300 text-sm">
							<span>© {new Date().getFullYear()} {personalInfo.name}. Made with</span>
							<FiHeart className="w-4 h-4 text-red-400" />
							<span>in Bangladesh</span>
						</div>
						<div className="flex items-center space-x-6 text-neutral-300 text-sm">
							<button
								onClick={() => scrollToSection("#about")}
								className="hover:text-primary-400 transition-colors duration-300"
							>
								About
							</button>
							<button
								onClick={() => scrollToSection("#contact")}
								className="hover:text-primary-400 transition-colors duration-300"
							>
								Contact
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Background decoration */}
			<div className="absolute inset-0 opacity-5 pointer-events-none">
				<div className="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl" />
				<div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500 rounded-full filter blur-3xl" />
			</div>
		</footer>
	);
};

export default Footer;
