import { motion } from "framer-motion";
import { FiCode, FiSmartphone, FiDatabase } from "react-icons/fi";
import { fadeInUp, staggerContainer, viewportOnce } from "../../utils/motion";

const Services = () => {
	const services = [
		{
			icon: FiCode,
			title: "Frontend Development",
			description: "Creating responsive, interactive user interfaces using React, TypeScript, and modern CSS frameworks.",
			features: ["React/Next.js", "TypeScript", "Tailwind CSS", "Responsive Design"],
			color: "from-blue-500 to-blue-600"
		},
		{
			icon: FiDatabase,
			title: "Backend Development",
			description: "Building robust APIs and server-side applications with Node.js, Express, and database integration.",
			features: ["Node.js/Express", "RESTful APIs", "MongoDB/MySQL", "Authentication"],
			color: "from-green-500 to-green-600"
		},
		{
			icon: FiSmartphone,
			title: "Full Stack Solutions",
			description: "End-to-end web application development from concept to deployment with modern tech stacks.",
			features: ["MERN Stack", "MEAN Stack", "Database Design", "API Integration"],
			color: "from-purple-500 to-purple-600"
		}
	];

	return (
		<section id="services" className="section-padding bg-bg-secondary relative overflow-hidden">
			<div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-accent-violet/5 blur-3xl pointer-events-none" />
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={viewportOnce}
					variants={staggerContainer(0.15)}
					className="text-center mb-16"
				>
					<motion.div
						variants={fadeInUp}
						className="inline-flex items-center px-4 py-2 glass text-accent-violet rounded-full text-sm font-medium mb-4"
					>
						Services
					</motion.div>
					<motion.h2
						variants={fadeInUp}
						className="text-3xl sm:text-4xl lg:text-5xl font-bold font-syne text-content-primary mb-6"
					>
						What I Can Do
						<span className="block text-gradient">For You</span>
					</motion.h2>
					<motion.p
						variants={fadeInUp}
						className="text-lg text-content-muted max-w-3xl mx-auto leading-relaxed"
					>
						I offer comprehensive web development services to help bring your ideas to life.
						From concept to deployment, I ensure quality, performance, and user satisfaction.
					</motion.p>
				</motion.div>

				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={viewportOnce}
					variants={staggerContainer(0.15)}
					className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
				>
					{services.map((service, index) => {
						const IconComponent = service.icon;
						return (
							<motion.div
								key={index}
								variants={fadeInUp}
								whileHover={{ y: -10 }}
								transition={{ type: "spring", stiffness: 300, damping: 20 }}
								className="group relative rounded-2xl overflow-hidden"
							>
								{/* Rotating gradient border (on hover) */}
								<div
									className="absolute inset-[-40%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow"
									style={{
										background:
											"conic-gradient(from 0deg, transparent 0deg, #7c3aed 60deg, transparent 130deg, #00f5ff 220deg, transparent 300deg)",
									}}
								/>
								<div className="relative m-[1px] rounded-2xl glass border border-violet-500/20 h-[calc(100%-2px)] overflow-hidden">
									<div className="p-8">
										<div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-accent-violet/20 to-accent-cyan/20 border border-accent-violet/30 shadow-glow-violet mb-6 group-hover:scale-110 transition-transform duration-300">
											<IconComponent className="w-8 h-8 text-accent-violet" />
										</div>

										<h3 className="text-xl font-bold font-syne text-content-primary mb-4 group-hover:text-accent-cyan transition-colors duration-300">
											{service.title}
										</h3>

										<p className="text-content-muted leading-relaxed mb-6">
											{service.description}
										</p>

										<div className="space-y-3">
											<h4 className="text-sm font-semibold text-content-primary uppercase tracking-wide">
												Key Features
											</h4>
											<ul className="space-y-2">
												{service.features.map((feature, featureIndex) => (
													<li key={featureIndex} className="flex items-center text-sm text-content-muted">
														<div className="w-1.5 h-1.5 bg-accent-cyan rounded-full mr-3 flex-shrink-0 shadow-glow-cyan"></div>
														{feature}
													</li>
												))}
											</ul>
										</div>
									</div>
								</div>
							</motion.div>
						);
					})}
				</motion.div>

				{/* CTA Section */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={viewportOnce}
					transition={{ duration: 0.6 }}
					className="mt-20 text-center"
				>
					<div className="relative glass glow-border rounded-3xl p-8 lg:p-12 overflow-hidden">
						<div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/5 to-accent-violet/5 pointer-events-none" />
						<div className="relative z-10">
							<h3 className="text-2xl lg:text-3xl font-bold font-syne text-content-primary mb-4">
								Ready to Start Your Project?
							</h3>
							<p className="text-content-muted text-lg mb-8 max-w-2xl mx-auto">
								Let's discuss your ideas and create something amazing together.
								I'm here to help turn your vision into reality.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<a
									href="#contact"
									onClick={(e) => {
										e.preventDefault();
										document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
									}}
									className="inline-flex items-center px-8 py-4 bg-accent-cyan text-bg-primary font-semibold rounded-xl hover:bg-accent-cyan/90 transition-all duration-300 shadow-glow-cyan hover:shadow-glow-cyan-lg transform hover:-translate-y-1"
								>
									Start a Project
									<svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
									</svg>
								</a>
								<a
									href="#projects"
									onClick={(e) => {
										e.preventDefault();
										document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
									}}
									className="inline-flex items-center px-8 py-4 border-2 border-accent-cyan/50 text-accent-cyan font-semibold rounded-xl hover:bg-accent-cyan/10 hover:border-accent-cyan transition-all duration-300"
								>
									View My Work
								</a>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default Services;
