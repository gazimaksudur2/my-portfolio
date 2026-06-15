import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiGithub, FiServer } from "react-icons/fi";
import Project from "./Project";
import { fadeInUp, staggerContainer, viewportOnce } from "../../utils/motion";

const Projects = () => {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		fetch("/projects.json")
			.then((res) => res.json())
			.then((data) => setProjects(data))
			.catch(() => setProjects([]));
	}, []);

	const featured = projects[0];
	const others = projects.slice(1, 4);

	return (
		<section id="projects" className="section-padding bg-bg-primary relative overflow-hidden">
			<div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-accent-cyan/5 blur-3xl pointer-events-none" />
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
						Real Projects
					</motion.div>
					<motion.h2
						variants={fadeInUp}
						className="text-3xl sm:text-4xl lg:text-5xl font-bold font-syne text-content-primary mb-6"
					>
						What I've Built
						<span className="block text-gradient">Highlights</span>
					</motion.h2>
					<motion.p
						variants={fadeInUp}
						className="text-lg text-content-muted max-w-3xl mx-auto leading-relaxed"
					>
						Real-world projects including fintech and agricultural e-commerce platforms,
						with focus on scalable apps and user-centered design.
					</motion.p>
				</motion.div>

				{featured && (
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={viewportOnce}
						transition={{ duration: 0.6 }}
						className="relative mb-12 rounded-3xl overflow-hidden glass border border-accent-cyan/20 shadow-glow-cyan"
					>
						{/* Animated gradient background */}
						<div className="absolute inset-0 opacity-40 pointer-events-none bg-gradient-to-br from-accent-cyan/10 via-transparent to-accent-violet/10" />
						<div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-accent-violet/10 blur-3xl pointer-events-none" />

						<div className="relative z-10 p-6 lg:p-8 flex flex-col-reverse lg:flex-row items-center justify-between gap-8">
							<div className="lg:w-1/2 space-y-4">
								<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30">
									Featured · {featured.projectType}
								</span>
								<h3 className="text-2xl lg:text-3xl font-bold font-syne text-content-primary">
									{featured.projectTitle}
								</h3>
								<p className="text-content-muted leading-relaxed">
									{featured.projectDescription}
								</p>
								<ul className="flex flex-wrap gap-2">
									{featured.skills.map((skill, idx) => (
										<li
											key={idx}
											className="px-3 py-1 rounded-full text-sm font-medium bg-accent-violet/10 text-accent-violet border border-accent-violet/30 shadow-glow-violet"
										>
											{skill}
										</li>
									))}
								</ul>
								<div className="flex flex-wrap gap-4 text-sm">
									{featured.liveSiteLink && featured.liveSiteLink !== "#" && (
										<a
											href={featured.liveSiteLink}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-1 text-accent-cyan hover:glow-cyan font-medium"
										>
											<FiExternalLink className="w-4 h-4" /> Live site
										</a>
									)}
									{featured.githubClientRepoLink && featured.githubClientRepoLink !== "#" && (
										<a
											href={featured.githubClientRepoLink}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-1 text-content-muted hover:text-accent-cyan font-medium"
										>
											<FiGithub className="w-4 h-4" /> GitHub Client
										</a>
									)}
									{featured.githubServerRepoLink && featured.githubServerRepoLink !== "#" && (
										<a
											href={featured.githubServerRepoLink}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-1 text-content-muted hover:text-accent-cyan font-medium"
										>
											<FiServer className="w-4 h-4" /> GitHub Server
										</a>
									)}
								</div>
								<div>
									<h4 className="text-content-primary font-semibold mb-2">Features</h4>
									<ul className="list-disc pl-5 space-y-1 text-content-muted text-sm">
										{featured.features.map((f, idx) => (
											<li key={idx}>{f}</li>
										))}
									</ul>
								</div>
							</div>
							<div className="lg:w-[45%] rounded-2xl overflow-hidden border border-accent-cyan/20 shadow-glow-cyan">
								<img
									className="w-full aspect-video object-cover"
									src={featured.bannerImgUrl}
									alt={featured.projectTitle}
								/>
							</div>
						</div>
					</motion.div>
				)}

				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={viewportOnce}
					variants={staggerContainer(0.15)}
					className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
				>
					{others.map((project, idx) => (
						<Project key={idx} project={project} />
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default Projects;
