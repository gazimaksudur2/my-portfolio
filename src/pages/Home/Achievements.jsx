import { motion } from "framer-motion";
import { FiTarget, FiZap, FiUsers, FiMessageCircle } from "react-icons/fi";
import { fadeInUp, staggerContainer, viewportOnce } from "../../utils/motion";

const achievements = [
	{
		icon: FiTarget,
		title: "Real project contributions",
		description: "Contributed to real fintech and agri-tech platforms; participated in system architecture discussions.",
		accent: "#fbbf24",
	},
	{
		icon: FiZap,
		title: "Problem-solving & production",
		description: "Solved deployment and authentication issues; delivered real production features.",
		accent: "#00f5ff",
	},
	{
		icon: FiUsers,
		title: "Leadership in meetings",
		description: "Participated in requirement analysis and planning (e.g. SmartAgroConnect meetings).",
		accent: "#fbbf24",
	},
	{
		icon: FiMessageCircle,
		title: "Communication & growth",
		description: "Motivated to improve English and communication; AWS-certified learner.",
		accent: "#00f5ff",
	},
];

const Achievements = () => {
	return (
		<section id="achievements" className="section-padding bg-bg-secondary relative overflow-hidden">
			<div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent-cyan/5 blur-3xl pointer-events-none" />
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
						Achievements & Highlights
					</motion.div>
					<motion.h2
						variants={fadeInUp}
						className="text-3xl sm:text-4xl lg:text-5xl font-bold font-syne text-content-primary mb-6"
					>
						What I've Done
						<span className="block text-gradient">So Far</span>
					</motion.h2>
					<motion.p
						variants={fadeInUp}
						className="text-lg text-content-muted max-w-3xl mx-auto leading-relaxed"
					>
						Practical, growth-oriented contributions—real projects, teamwork, and continuous learning.
					</motion.p>
				</motion.div>

				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={viewportOnce}
					variants={staggerContainer(0.12)}
					className="grid md:grid-cols-2 gap-8"
				>
					{achievements.map((item, index) => {
						const IconComponent = item.icon;
						return (
							<motion.div
								key={index}
								variants={fadeInUp}
								className="shimmer-parent flex items-start gap-4 p-6 glass rounded-2xl border border-white/10 hover:border-accent-cyan/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-cyan"
							>
								<div
									className="p-3 rounded-xl flex-shrink-0 border"
									style={{
										borderColor: `${item.accent}55`,
										background: `${item.accent}14`,
										boxShadow: `0 0 18px ${item.accent}40`,
									}}
								>
									<IconComponent className="w-6 h-6" style={{ color: item.accent }} />
								</div>
								<div>
									<h3 className="text-lg font-bold font-syne text-content-primary">{item.title}</h3>
									<p className="text-content-muted text-sm mt-2 leading-relaxed">{item.description}</p>
								</div>
							</motion.div>
						);
					})}
				</motion.div>
			</div>
		</section>
	);
};

export default Achievements;
