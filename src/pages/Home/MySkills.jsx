import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { FiCode, FiServer, FiDatabase, FiCloud, FiTool } from "react-icons/fi";
import { staggerContainer, viewportOnce } from "../../utils/motion";

const skillCategories = [
	{
		id: "languages",
		title: "Programming",
		icon: FiTool,
		color: "from-primary-500 to-primary-600",
		accent: "#00f5ff",
		skills: ["Python", "Java", "C++", "JavaScript", "TypeScript"],
	},
	{
		id: "backend",
		title: "Backend & DB",
		icon: FiServer,
		color: "from-secondary-500 to-secondary-600",
		accent: "#7c3aed",
		skills: ["Node.js", "Express.js", "PostgreSQL", "MongoDB", "MySQL", "Prisma"],
	},
	{
		id: "frontend",
		title: "Frontend",
		icon: FiCode,
		color: "from-green-500 to-green-600",
		accent: "#00ff88",
		skills: ["React.js", "Tailwind CSS", "HTML5", "CSS3", "Responsive UX"],
	},
	{
		id: "cloud",
		title: "Cloud & DevOps",
		icon: FiCloud,
		color: "from-orange-500 to-orange-600",
		accent: "#00f5ff",
		skills: ["AWS Cloud", "Docker", "Jenkins", "CI/CD"],
	},
	{
		id: "core",
		title: "Core Concepts",
		icon: FiDatabase,
		color: "from-neutral-600 to-neutral-700",
		accent: "#7c3aed",
		skills: ["OOP", "Data Structures", "MVC", "RBAC", "Agile", "Git"],
	},
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
			{/* Glow layer */}
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
	return (
		<section id="skills" className="section-padding bg-bg-primary relative overflow-hidden">
			<div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-accent-cyan/5 blur-3xl pointer-events-none" />
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={viewportOnce}
					variants={staggerContainer(0.15)}
					className="text-center mb-16"
				>
					<motion.div
						variants={hexVariants}
						className="inline-flex items-center px-4 py-2 glass text-accent-cyan rounded-full text-sm font-medium mb-4"
					>
						Technical Skills
					</motion.div>
					<motion.h2
						variants={hexVariants}
						className="text-3xl sm:text-4xl lg:text-5xl font-bold font-syne text-content-primary mb-6"
					>
						What I Work With
						<span className="block text-gradient">By Category</span>
					</motion.h2>
					<motion.p
						variants={hexVariants}
						className="text-lg text-content-muted max-w-3xl mx-auto leading-relaxed"
					>
						My continuous learning mindset keeps me updated with the latest trends and technologies
						in web development, enabling me to deliver cutting-edge solutions.
					</motion.p>
				</motion.div>

				<div className="space-y-14">
					{skillCategories.map((category) => {
						const IconComponent = category.icon;
						return (
							<div key={category.id}>
								{/* Glowing category label */}
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

								{/* Hexagon grid */}
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
				</div>
			</div>
		</section>
	);
};

export default MySkills;
