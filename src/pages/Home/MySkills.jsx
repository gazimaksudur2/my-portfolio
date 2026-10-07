import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tilt } from "react-tilt";
import { FiCode, FiServer, FiDatabase, FiCloud, FiTool } from "react-icons/fi";
import { staggerContainer, viewportOnce } from "../../utils/motion";
import SectionHeader from "../../components/SectionHeader";

const skillCategories = [
	{
		id: "languages",
		title: "Languages",
		icon: FiTool,
		accent: "#00f5ff",
		filter: "Languages",
		skills: ["JavaScript (ES6+)", "TypeScript", "Python", "Java", "C++", "Go"],
	},
	{
		id: "backend",
		title: "Backend & DB",
		icon: FiServer,
		accent: "#7c3aed",
		filter: "Backend",
		skills: ["Node.js", "Express.js", "Beego", "PostgreSQL", "MongoDB", "FastAPI", "REST APIs"],
	},
	{
		id: "frontend",
		title: "Frontend",
		icon: FiCode,
		accent: "#00ff88",
		filter: "Frontend",
		skills: ["React.js", "Next.js", "Tailwind CSS", "HTML5", "CSS3"],
	},
	{
		id: "cloud",
		title: "Cloud & DevOps",
		icon: FiCloud,
		accent: "#00f5ff",
		filter: "Cloud",
		skills: ["AWS Solutions Architect", "AWS Cloud Practitioner", "Docker", "Jenkins", "CI/CD"],
	},
	{
		id: "core",
		title: "Core Concepts",
		icon: FiDatabase,
		accent: "#7c3aed",
		filter: "Core",
		skills: ["OOP", "Data Structures & Algorithms", "MVC", "Agile", "Git", "GitHub", "Postman"],
	},
];

const FILTERS = ["All", "Languages", "Frontend", "Backend", "Cloud", "Core"];

// Tech logos for the marquee (sponsors.json data inlined)
const TECH_LOGOS = [
	{ name: "React", url: "https://www.svgrepo.com/show/303157/react-logo.svg" },
	{ name: "JavaScript", url: "https://www.svgrepo.com/show/452045/js.svg" },
	{ name: "NextJS", url: "https://www.svgrepo.com/show/512317/github-142.svg" },
	{ name: "Go", url: "https://www.svgrepo.com/show/452214/go.svg" },
	{ name: "MongoDB", url: "https://www.svgrepo.com/show/373845/mongo.svg" },
	{ name: "Express.js", url: "https://www.svgrepo.com/show/376367/express.svg" },
	{ name: "Node.js", url: "https://www.svgrepo.com/show/452075/node-js.svg" },
	{ name: "Tailwind CSS", url: "https://www.svgrepo.com/show/354431/tailwindcss-icon.svg" },
	{ name: "GitHub", url: "https://www.svgrepo.com/show/512317/github-142.svg" },
];

const hexClip = { clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" };

const tiltOptions = {
	max: 18,
	scale: 1.06,
	speed: 600,
	glare: false,
	"max-glare": 0,
};

const hexVariants = {
	hidden: { opacity: 0, scale: 0.5 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
	},
};

const SkillHex = ({ skill, accent, Icon }) => (
	<Tilt options={tiltOptions} className="[transform-style:preserve-3d]">
		<motion.div variants={hexVariants} className="group relative">
			<div
				className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"
				style={{ ...hexClip, background: accent }}
			/>
			<div
				className="relative w-24 h-28 sm:w-28 sm:h-32 flex flex-col items-center justify-center gap-1.5 bg-bg-card border border-white/10 group-hover:border-transparent transition-colors duration-300"
				style={hexClip}
			>
				<Icon className="w-6 h-6 transition-colors duration-300" style={{ color: accent }} />
				<span className="text-[11px] sm:text-xs font-medium text-content-primary text-center px-2 leading-tight">
					{skill}
				</span>
			</div>
		</motion.div>
	</Tilt>
);

const MySkills = () => {
	const [active, setActive] = useState("All");

	const visible =
		active === "All"
			? skillCategories
			: skillCategories.filter((c) => c.filter === active);

	return (
		<section id="skills" className="section-padding bg-bg-primary relative overflow-hidden">
			<div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-accent-cyan/5 blur-3xl pointer-events-none" />

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<SectionHeader
					badge="Technical Skills"
					title="What I Work With"
					titleAccent="By Category"
					description="A continuously expanding toolkit spanning languages, frameworks, cloud platforms, and core engineering concepts."
				/>

				{/* Filter chips */}
				<div className="flex flex-wrap justify-center gap-3 mb-14">
					{FILTERS.map((f) => (
						<button
							key={f}
							onClick={() => setActive(f)}
							className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-250 border ${
								active === f
									? "bg-accent-cyan text-bg-primary border-accent-cyan shadow-glow-cyan"
									: "glass border-white/10 text-content-muted hover:border-accent-cyan/40 hover:text-content-primary"
							}`}
						>
							{f}
						</button>
					))}
				</div>

				{/* Categories */}
				<AnimatePresence mode="wait">
					<motion.div
						key={active}
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -8 }}
						transition={{ duration: 0.3 }}
						className="space-y-14"
					>
						{visible.map((category) => {
							const IconComponent = category.icon;
							return (
								<div key={category.id}>
									<div className="flex items-center gap-4 mb-8">
										<div
											className="inline-flex p-2.5 rounded-xl border"
											style={{
												borderColor: `${category.accent}55`,
												background: `${category.accent}14`,
												boxShadow: `0 0 18px ${category.accent}40`,
											}}
										>
											<IconComponent className="w-5 h-5" style={{ color: category.accent }} />
										</div>
										<h3 className="text-xl font-bold font-syne text-content-primary">
											{category.title}
										</h3>
										<div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
									</div>

									<motion.div
										initial="hidden"
										whileInView="visible"
										viewport={viewportOnce}
										variants={staggerContainer(0.08)}
										className="flex flex-wrap gap-4 sm:gap-5"
									>
										{category.skills.map((skill, idx) => (
											<SkillHex
												key={idx}
												skill={skill}
												accent={category.accent}
												Icon={IconComponent}
											/>
										))}
									</motion.div>
								</div>
							);
						})}
					</motion.div>
				</AnimatePresence>

				{/* Tech logo marquee */}
				<div className="mt-20">
					<p className="text-center text-xs font-semibold uppercase tracking-widest text-content-muted/50 mb-6">
						Core technologies
					</p>
					<div className="marquee-track overflow-hidden relative">
						{/* Fade edges */}
						<div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
						<div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />
						{/* Doubled list for seamless loop */}
						<div className="animate-marquee flex gap-12 w-max">
							{[...TECH_LOGOS, ...TECH_LOGOS].map((logo, i) => (
								<div
									key={i}
									className="flex flex-col items-center gap-2 flex-shrink-0"
									title={logo.name}
								>
									<div className="w-12 h-12 glass rounded-xl border border-white/10 flex items-center justify-center hover:border-accent-cyan/30 hover:shadow-glow-cyan transition-all duration-300 p-2">
										<img
											src={logo.url}
											alt={logo.name}
											className="w-full h-full object-contain opacity-70 hover:opacity-100 transition-opacity"
											loading="lazy"
										/>
									</div>
									<span className="text-[10px] text-content-muted/60 font-medium whitespace-nowrap">
										{logo.name}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default MySkills;
