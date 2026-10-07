import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportOnce } from "../utils/motion";

/**
 * Shared section chrome: badge pill → Syne heading → optional description.
 * Keeps typography locked across all sections while interiors vary freely.
 */
const SectionHeader = ({
	badge,
	title,
	titleAccent,
	description,
	badgeColor = "text-accent-cyan",
}) => (
	<motion.div
		initial="hidden"
		whileInView="visible"
		viewport={viewportOnce}
		variants={staggerContainer(0.15)}
		className="text-center mb-16"
	>
		<motion.div
			variants={fadeInUp}
			className={`inline-flex items-center px-4 py-2 glass ${badgeColor} rounded-full text-sm font-medium mb-4`}
		>
			{badge}
		</motion.div>

		<motion.h2
			variants={fadeInUp}
			className="text-3xl sm:text-4xl lg:text-5xl font-bold font-syne text-content-primary mb-6"
		>
			{title}
			{titleAccent && <span className="block text-gradient">{titleAccent}</span>}
		</motion.h2>

		{description && (
			<motion.p
				variants={fadeInUp}
				className="text-lg text-content-muted max-w-3xl mx-auto leading-relaxed"
			>
				{description}
			</motion.p>
		)}
	</motion.div>
);

export default SectionHeader;
