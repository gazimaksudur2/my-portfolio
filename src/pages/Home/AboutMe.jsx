import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import Icon from "../../components/Icon";
import { highlights, quickFacts } from "../../constants";
import { useIsMobile } from "../../hooks/useIsMobile";
import CanvasFallback from "../../components/three/CanvasFallback";
import { fadeInUp, staggerContainer, viewportOnce } from "../../utils/motion";

const FloatingSphere = lazy(() => import("../../components/three/FloatingSphere"));

const bioParagraphs = [
	"My journey into tech is driven by curiosity and a desire to build secure, high-performance, and scalable systems. While I am well-versed in frontend technologies like React and Tailwind, my core focus is on backend architecture, MVC patterns, RBAC authentication, and CI/CD tools like Docker and Jenkins. I've contributed to the end-to-end development of commercial applications and consistently strive for production-grade reliability.",
	"Beyond writing code, I have hands-on experience executing rigorous SQA and training ML models through RLHF. I bring strong problem-solving skills, a fast-learning mindset, and a commitment to industry standards. I work well in collaborative environments, learning from senior developers, and always aiming to elevate the entire engineering team's output.",
];

const AboutMe = () => {
	const isMobile = useIsMobile();

	return (
		<section id="about" className="section-padding bg-bg-secondary relative overflow-hidden">
			<div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-accent-violet/5 blur-3xl pointer-events-none" />
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
						className="inline-flex items-center px-4 py-2 glass text-accent-cyan rounded-full text-sm font-medium mb-4"
					>
						About Me
					</motion.div>
					<motion.h2
						variants={fadeInUp}
						className="text-3xl sm:text-4xl lg:text-5xl font-bold font-syne text-content-primary mb-6"
					>
						My Story &
						<span className="block text-gradient">Direction</span>
					</motion.h2>
					<motion.p
						variants={fadeInUp}
						className="text-lg text-content-muted max-w-3xl mx-auto leading-relaxed"
					>
						I'm a Computer Science student at SUST and a Backend-focused Software Engineer with hands-on
						experience architecting RESTful APIs and managing complex database designs using PostgreSQL and MongoDB.
						I'm also an AWS Academy Graduate with a deep interest in DevSecOps, containerization, and automation.
					</motion.p>
				</motion.div>

				<div className="grid lg:grid-cols-2 gap-16 items-center">
					{/* 3D floating sphere */}
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={viewportOnce}
						transition={{ duration: 0.7 }}
						className="order-2 lg:order-1 flex items-center justify-center"
					>
						<div className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
							{isMobile ? (
								<CanvasFallback variant="sphere" className="w-full h-full" />
							) : (
								<Suspense fallback={<CanvasFallback variant="sphere" className="w-full h-full" />}>
									<FloatingSphere accent="#00f5ff" />
								</Suspense>
							)}
						</div>
					</motion.div>

					{/* Content */}
					<div className="order-1 lg:order-2 space-y-8">
						<motion.div
							initial="hidden"
							whileInView="visible"
							viewport={viewportOnce}
							variants={staggerContainer(0.2)}
							className="space-y-6"
						>
							<motion.h3
								variants={fadeInUp}
								className="text-2xl font-bold font-syne text-content-primary"
							>
								Journey, Motivation & Focus
							</motion.h3>
							<div className="space-y-4 text-content-muted leading-relaxed">
								{bioParagraphs.map((para, i) => (
									<motion.p key={i} variants={fadeInUp}>
										{para}
									</motion.p>
								))}
							</div>
						</motion.div>

						{/* Personal Info */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={viewportOnce}
							transition={{ duration: 0.5 }}
							className="glass glow-border p-6 rounded-2xl"
						>
							<h4 className="text-lg font-semibold text-content-primary mb-4">Quick Facts</h4>
							<div className="grid grid-cols-2 gap-4">
								{Object.entries(quickFacts).map(([key, value]) => (
									<div key={key} className="space-y-1">
										<div className="text-sm text-content-muted font-medium">
											{key.charAt(0).toUpperCase() + key.slice(1)}
										</div>
										<div className="text-content-primary font-semibold">{value}</div>
									</div>
								))}
							</div>
						</motion.div>
					</div>
				</div>

				{/* Highlights */}
				<div className="mt-16">
					<h3 className="text-2xl font-bold font-syne text-content-primary text-center mb-8">
						What I Bring
					</h3>
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={viewportOnce}
						variants={staggerContainer(0.12)}
						className="grid md:grid-cols-2 gap-6"
					>
						{highlights.map((highlight, index) => (
							<motion.div
								key={index}
								variants={fadeInUp}
								className="flex items-start space-x-4 p-6 glass rounded-2xl border border-accent-cyan/15 hover:border-accent-cyan/40 hover:shadow-glow-cyan transition-all duration-300 transform hover:-translate-y-1"
							>
								<div className="p-3 bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20 border border-accent-cyan/30 rounded-xl">
									<Icon name={highlight.icon} className="w-6 h-6 text-accent-cyan" />
								</div>
								<div className="flex-1">
									<h4 className="text-lg font-semibold text-content-primary mb-2">
										{highlight.title}
									</h4>
									<p className="text-content-muted leading-relaxed">{highlight.description}</p>
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>

				{/* Call to Action */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={viewportOnce}
					transition={{ duration: 0.6 }}
					className="mt-16 text-center"
				>
					<div className="relative glass glow-border rounded-3xl p-8 lg:p-12 overflow-hidden">
						<div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/5 to-accent-violet/5 pointer-events-none" />
						<div className="relative z-10">
							<h3 className="text-2xl lg:text-3xl font-bold font-syne text-content-primary mb-4">
								Ready to Work Together?
							</h3>
							<p className="text-content-muted text-lg mb-8 max-w-2xl mx-auto">
								I'm always excited to take on new challenges and collaborate on
								innovative projects. Let's create something amazing together!
							</p>
							<a
								href="#contact"
								onClick={(e) => {
									e.preventDefault();
									document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
								}}
								className="inline-flex items-center px-8 py-4 bg-accent-cyan text-bg-primary font-semibold rounded-xl hover:bg-accent-cyan/90 transition-all duration-300 shadow-glow-cyan hover:shadow-glow-cyan-lg transform hover:-translate-y-1"
							>
								Let's Connect
								<svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
								</svg>
							</a>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default AboutMe;
