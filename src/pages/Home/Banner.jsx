import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { FiDownload, FiMail, FiGithub, FiLinkedin, FiExternalLink } from "react-icons/fi";
import { Typewriter } from "react-simple-typewriter";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useCountUp } from "../../hooks/useCountUp";
import CanvasFallback from "../../components/three/CanvasFallback";

const ParticleField = lazy(() => import("../../components/three/ParticleField"));

const StatCard = ({ number, label, index }) => {
	const { ref, display } = useCountUp(number);
	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.4 }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			className="text-center rounded-2xl glass glow-border p-5 hover:shadow-glow-cyan transition-all duration-300"
		>
			<div className="text-3xl lg:text-4xl font-bold font-syne text-gradient mb-2">
				{display}
			</div>
			<div className="text-content-muted text-sm font-medium">{label}</div>
		</motion.div>
	);
};

const Banner = () => {
	const isMobile = useIsMobile();

	const roles = [
		"Backend-focused Soft. Engineer",
		"Full Stack Developer",
		"Graduated from CSE, SUST",
	];

	const stats = [
		{ number: "3+", label: "Major Enterprise Projects" },
		{ number: "1+", label: "Years Professional Experience" },
		{ number: "15+", label: "Technologies & Tools" },
		{ number: "—", label: "Open to Opportunities" },
	];

	const highlights = [
		{ label: "Bangladesh 🇧🇩", key: "location" },
		{ label: "Graduated from CSE, SUST", key: "sust" },
		{ label: "Software Developer", key: "developer" },
	];

	const nameContainer = {
		hidden: {},
		visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
	};
	const nameChar = {
		hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
		visible: {
			opacity: 1,
			y: 0,
			filter: "blur(0px)",
			transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
		},
	};

	const renderAnimatedName = (text) =>
		text.split("").map((char, i) => (
			<motion.span key={`${char}-${i}`} variants={nameChar} className="inline-block">
				{char === " " ? "\u00A0" : char}
			</motion.span>
		));

	return (
		<section
			id="home"
			className="min-h-screen flex items-center justify-center relative overflow-hidden bg-bg-primary"
		>
			{/* 3D particle background (desktop only) with graceful fallback */}
			<div className="absolute inset-0">
				{isMobile ? (
					<CanvasFallback variant="field" />
				) : (
					<Suspense fallback={<CanvasFallback variant="field" />}>
						<ParticleField />
					</Suspense>
				)}
				<div className="absolute inset-0 bg-gradient-to-b from-bg-primary/40 via-transparent to-bg-primary pointer-events-none" />
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
				<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
					{/* Content */}
					<motion.div
						initial="hidden"
						animate="visible"
						variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
						className="space-y-8"
					>
						<div className="space-y-4">
							<motion.div
								variants={nameChar}
								className="flex items-center space-x-2 text-accent-cyan font-medium"
							>
								<div className="w-8 h-px bg-accent-cyan shadow-glow-cyan"></div>
								<span>Hello, I'm</span>
							</motion.div>

							<motion.h1
								variants={nameContainer}
								className="text-4xl md:text-5xl xl:text-6xl font-bold font-syne text-content-primary leading-tight"
							>
								<span className="block">{renderAnimatedName("Gazi Maksudur")}</span>
								<span className="block text-gradient glow-cyan">
									{renderAnimatedName("Rahman")}
								</span>
							</motion.h1>

							<motion.div
								variants={nameChar}
								className="text-xl sm:text-2xl xl:text-3xl text-content-muted font-medium h-16 flex items-center"
							>
								<span className="mr-3">I'm a</span>
								<span className="text-accent-cyan font-semibold glow-cyan">
									<Typewriter
										words={roles}
										loop={0}
										cursor
										cursorStyle="|"
										typeSpeed={100}
										deleteSpeed={50}
										delaySpeed={2000}
									/>
								</span>
							</motion.div>

							<motion.p
								variants={nameChar}
								className="md:text-lg text-content-muted leading-relaxed max-w-2xl"
							>
								I'm a Backend-focused Software Engineer specializing in Node.js, Express, and PostgreSQL.
								I build secure, scalable web applications and actively work with AWS, Docker, and CI/CD pipelines
								to deliver production-ready systems.
							</motion.p>
							<motion.div variants={nameChar} className="flex flex-wrap gap-3">
								{highlights.map((h) => (
									<span
										key={h.key}
										className="inline-flex items-center px-4 py-2 glass rounded-full text-sm font-medium text-content-primary border border-accent-cyan/20"
									>
										{h.label}
									</span>
								))}
							</motion.div>
						</div>

						{/* CTA Buttons */}
						<motion.div variants={nameChar} className="flex flex-col sm:flex-row gap-4">
							<a
								href="https://drive.google.com/file/d/1-AoHayQihlWRG17EFwtaeCt7q30zsTQt/view?usp=sharing"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center justify-center px-8 py-4 font-semibold rounded-xl text-bg-primary bg-accent-cyan hover:bg-accent-cyan/90 transition-all duration-300 shadow-glow-cyan hover:shadow-glow-cyan-lg transform hover:-translate-y-1 group"
							>
								<FiDownload className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
								Download Resume
								<FiExternalLink className="ml-2 w-4 h-4 opacity-70" />
							</a>
							<a
								href="#contact"
								onClick={(e) => {
									e.preventDefault();
									document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
								}}
								className="inline-flex items-center justify-center px-8 py-4 border-2 border-accent-cyan/50 text-accent-cyan font-semibold rounded-xl hover:bg-accent-cyan/10 hover:border-accent-cyan hover:shadow-glow-cyan transition-all duration-300 group"
							>
								<FiMail className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
								Let's Talk
							</a>
						</motion.div>

						{/* Social Links */}
						<motion.div variants={nameChar} className="flex items-center space-x-6 pt-4">
							<span className="text-content-muted font-medium">Follow me:</span>
							<div className="flex space-x-4">
								<a
									href="https://github.com/gazimaksudur2"
									target="_blank"
									rel="noopener noreferrer"
									className="p-3 glass rounded-full text-content-primary hover:text-accent-cyan hover:shadow-glow-cyan transition-all duration-300 hover:scale-110"
								>
									<FiGithub className="w-5 h-5" />
								</a>
								<a
									href="https://www.linkedin.com/in/gazimaksudur/"
									target="_blank"
									rel="noopener noreferrer"
									className="p-3 glass rounded-full text-content-primary hover:text-accent-cyan hover:shadow-glow-cyan transition-all duration-300 hover:scale-110"
								>
									<FiLinkedin className="w-5 h-5" />
								</a>
							</div>
						</motion.div>
					</motion.div>

					{/* Image with rotating glowing ring */}
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, delay: 0.3 }}
						className="relative"
					>
						<div className="relative">
							<div className="w-80 h-80 lg:w-96 lg:h-96 mx-auto relative flex items-center justify-center">
								{/* Rotating cyan ring */}
								<div className="absolute inset-0 rounded-full border-2 border-dashed border-accent-cyan/40 animate-spin-slow" />
								<div className="absolute inset-3 rounded-full border border-accent-violet/30 animate-glow-pulse" />
								<div className="absolute inset-6 rounded-full bg-gradient-to-br from-accent-cyan/10 to-accent-violet/10 blur-2xl" />
								<img
									src="https://i.ibb.co/nk2X4F0/selfie-png.png"
									alt="Gazi Maksudur Rahman"
									className="relative w-[82%] h-[82%] object-cover rounded-full shadow-glow-cyan z-10"
								/>
							</div>

							{/* Floating elements */}
							<div className="absolute -top-2 -left-2 lg:-top-4 lg:-left-4 w-16 h-16 glass rounded-2xl shadow-glow-cyan flex items-center justify-center animate-floaty">
								<span className="text-2xl">⚡</span>
							</div>
							<div className="absolute -bottom-2 -right-2 lg:-bottom-4 lg:-right-4 w-16 h-16 glass rounded-2xl shadow-glow-violet flex items-center justify-center animate-floaty" style={{ animationDelay: "2s" }}>
								<span className="text-2xl">🚀</span>
							</div>
						</div>
					</motion.div>
				</div>

				{/* Stats Section */}
				<div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6">
					{stats.map((stat, index) => (
						<StatCard key={index} number={stat.number} label={stat.label} index={index} />
					))}
				</div>
			</div>

			{/* Scroll indicator */}
			<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
				<div className="w-6 h-10 border-2 border-accent-cyan/40 rounded-full flex justify-center">
					<div className="w-1 h-3 bg-accent-cyan rounded-full mt-2 animate-pulse"></div>
				</div>
			</div>
		</section>
	);
};

export default Banner;
