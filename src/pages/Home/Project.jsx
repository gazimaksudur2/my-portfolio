import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { FiExternalLink, FiGithub, FiServer } from "react-icons/fi";
import { fadeInUp } from "../../utils/motion";

const tiltOptions = {
	max: 10,
	scale: 1.02,
	speed: 700,
	glare: false,
	"max-glare": 0,
};

const Project = ({ project }) => {
	if (!project) return null;

	const hasLive = project.liveSiteLink && project.liveSiteLink !== "#";
	const hasClient = project.githubClientRepoLink && project.githubClientRepoLink !== "#";
	const hasServer = project.githubServerRepoLink && project.githubServerRepoLink !== "#";

	return (
		<motion.div variants={fadeInUp} className="h-full">
			<Tilt options={tiltOptions} className="h-full [transform-style:preserve-3d]">
				<div className="shimmer-parent group h-full glass rounded-2xl border border-white/10 overflow-hidden hover:border-accent-cyan/40 hover:shadow-glow-cyan transition-all duration-300">

					{/* Banner image — live-site overlay on image hover only (named group) */}
					<div className="relative overflow-hidden border-b border-white/10 group/img">
						<img
							className="w-full aspect-video object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
							src={project.bannerImgUrl}
							alt={project.projectTitle}
						/>
						{/* Bottom-fade gradient */}
						<div className="absolute inset-0 bg-gradient-to-t from-bg-card/80 to-transparent pointer-events-none" />
						{/* Live-site overlay — appears only when hovering THIS image wrapper */}
						{hasLive && (
							<a
								href={project.liveSiteLink}
								target="_blank"
								rel="noopener noreferrer"
								className="absolute inset-0 z-10 flex items-center justify-center bg-transparent group-hover/img:bg-black/55 group-hover/img:backdrop-blur-[3px] transition-all duration-300"
								aria-label={`Visit ${project.projectTitle} live`}
							>
								<div className="opacity-0 scale-75 group-hover/img:opacity-100 group-hover/img:scale-100 transition-all duration-300 p-5 rounded-full bg-accent-cyan/20 border border-accent-cyan/50 shadow-glow-cyan">
									<FiExternalLink className="w-9 h-9 text-accent-cyan" />
								</div>
							</a>
						)}
					</div>

					{/* Card body */}
					<div className="p-6">
						<span className="text-accent-cyan font-medium text-sm">{project.projectType}</span>
						<h3 className="text-xl font-bold font-syne text-content-primary mt-1 mb-2">
							{project.projectTitle}
						</h3>
						<p className="text-content-muted text-sm leading-relaxed mb-4">
							{project.projectDescription}
						</p>
						<ul className="flex flex-wrap gap-2 mb-4">
							{project.skills.map((skill, idx) => (
								<li
									key={idx}
									className="px-2 py-0.5 rounded-full text-xs font-medium bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20"
								>
									{skill}
								</li>
							))}
						</ul>
						<div className="flex flex-wrap gap-4 text-sm">
							{hasLive && (
								<a
									href={project.liveSiteLink}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1 text-accent-cyan hover:glow-cyan font-medium"
								>
									<FiExternalLink className="w-4 h-4" /> Live site
								</a>
							)}
							{hasClient && (
								<a
									href={project.githubClientRepoLink}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1 text-content-muted hover:text-accent-cyan font-medium"
								>
									<FiGithub className="w-4 h-4" /> GitHub
								</a>
							)}
							{hasServer && (
								<a
									href={project.githubServerRepoLink}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1 text-content-muted hover:text-accent-cyan font-medium"
								>
									<FiServer className="w-4 h-4" /> Server
								</a>
							)}
						</div>
						<ul className="mt-4 list-disc pl-5 space-y-1 text-content-muted text-xs">
							{project.features.slice(0, 2).map((f, idx) => (
								<li key={idx}>{f}</li>
							))}
						</ul>
					</div>
				</div>
			</Tilt>
		</motion.div>
	);
};

export default Project;
