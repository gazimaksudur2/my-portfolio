import { motion } from "framer-motion";
import { FiArrowRight, FiCode, FiPackage, FiShield } from "react-icons/fi";
import { fadeInUp, staggerContainer, viewportOnce } from "../../utils/motion";
import SectionHeader from "../../components/SectionHeader";
import { scrollToSection } from "../../hooks/useLenis";

const HOW_I_WORK = [
	{
		verb: "Build",
		icon: FiCode,
		accent: "#00f5ff",
		description:
			"Architect full-stack features end-to-end — React frontends, TypeScript/Node.js APIs, PostgreSQL/MongoDB schemas, and REST contracts.",
	},
	{
		verb: "Ship",
		icon: FiPackage,
		accent: "#7c3aed",
		description:
			"Containerise with Docker, wire Jenkins CI/CD pipelines, and deploy to AWS — so every merge is one command away from production.",
	},
	{
		verb: "Harden",
		icon: FiShield,
		accent: "#00ff88",
		description:
			"Apply RLHF-grade code review rigour: security, logic correctness, edge cases, and performance — habits built from 2 years of AI evaluation.",
	},
];

const Services = () => (
	<section id="services" className="section-padding bg-bg-secondary relative overflow-hidden">
		<div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-accent-violet/5 blur-3xl pointer-events-none" />

		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
			<SectionHeader
				badge="How I Work"
				badgeColor="text-accent-violet"
				title="Build · Ship"
				titleAccent="Harden"
				description="Three disciplines that shape every project I touch — from the first commit to a hardened production release."
			/>

			<motion.div
				initial="hidden"
				whileInView="visible"
				viewport={viewportOnce}
				variants={staggerContainer(0.15)}
				className="grid md:grid-cols-3 gap-6 lg:gap-8"
			>
				{HOW_I_WORK.map((step, index) => {
					const Icon = step.icon;
					return (
						<motion.div
							key={step.verb}
							variants={fadeInUp}
							className="group relative rounded-2xl overflow-hidden"
						>
							{/* Spinning conic border on hover */}
							<div
								className="absolute inset-[-40%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow"
								style={{
									background: `conic-gradient(from 0deg, transparent 0deg, ${step.accent}80 60deg, transparent 130deg, ${step.accent}40 220deg, transparent 300deg)`,
								}}
							/>
							<div className="relative m-[1px] rounded-2xl glass border border-white/10 h-[calc(100%-2px)] overflow-hidden p-8 space-y-4">
								{/* Step number */}
								<span
									className="text-7xl font-bold font-syne opacity-10 absolute top-4 right-6 select-none pointer-events-none"
									style={{ color: step.accent }}
								>
									{String(index + 1).padStart(2, "0")}
								</span>

								<div
									className="inline-flex p-3.5 rounded-2xl border group-hover:scale-110 transition-transform duration-300"
									style={{
										borderColor: `${step.accent}55`,
										background: `${step.accent}14`,
										boxShadow: `0 0 18px ${step.accent}30`,
									}}
								>
									<Icon className="w-7 h-7" style={{ color: step.accent }} />
								</div>

								<h3
									className="text-2xl font-bold font-syne group-hover:transition-colors duration-300"
									style={{ color: step.accent }}
								>
									{step.verb}
								</h3>

								<p className="text-content-muted leading-relaxed text-sm lg:text-base">
									{step.description}
								</p>
							</div>
						</motion.div>
					);
				})}
			</motion.div>

			{/* Bridge link to Projects */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={viewportOnce}
				transition={{ duration: 0.5, delay: 0.3 }}
				className="mt-14 text-center"
			>
				<p className="text-content-muted mb-6 text-lg">See these principles in action →</p>
				<button
					onClick={() => scrollToSection("#projects")}
					className="inline-flex items-center gap-2 px-8 py-4 bg-accent-cyan text-bg-primary font-semibold rounded-xl hover:bg-accent-cyan/90 transition-all duration-300 shadow-glow-cyan hover:shadow-glow-cyan-lg hover:-translate-y-1 group"
				>
					View Projects
					<FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
				</button>
			</motion.div>
		</div>
	</section>
);

export default Services;
