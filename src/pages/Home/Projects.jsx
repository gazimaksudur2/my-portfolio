import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiGithub, FiServer } from "react-icons/fi";
import Project from "./Project";
import { fadeInUp, staggerContainer, viewportOnce } from "../../utils/motion";
import SectionHeader from "../../components/SectionHeader";

// Map raw projectType strings to short filter labels
const TYPE_TO_FILTER = {
	"AWS Certification Preparation": "Cloud & AWS",
	"Agricultural Marketplace (B2B)": "Marketplace",
	"EdTech Platform": "EdTech",
	Fintech: "Fintech",
	"Hotel Booking Management System": "Full Stack",
};

const ALL_FILTERS = ["All", "Cloud & AWS", "Marketplace", "EdTech", "Fintech", "Full Stack"];

const Projects = () => {
	const [projects, setProjects] = useState([]);
	const [filter, setFilter] = useState("All");

	useEffect(() => {
		fetch("/projects.json")
			.then((res) => res.json())
			.then((data) => setProjects(data))
			.catch(() => setProjects([]));
	}, []);

	const filtered =
		filter === "All"
			? projects
			: projects.filter((p) => TYPE_TO_FILTER[p.projectType] === filter);

	const featured = filtered[0];
	const others = filtered.slice(1);

	return (
		<section id="projects" className="section-padding bg-bg-primary relative overflow-hidden">
			<div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-accent-cyan/5 blur-3xl pointer-events-none" />

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<SectionHeader
					badge="Real Projects"
					badgeColor="text-accent-violet"
					title="What I've Built"
					titleAccent="Highlights"
					description="Real-world projects including cloud tooling, fintech, agricultural e-commerce, and EdTech platforms — with a focus on scalable architecture and user-centred design."
				/>

				{/* Filter chips */}
				<div className="flex flex-wrap justify-center gap-3 mb-12">
					{ALL_FILTERS.map((f) => (
						<button
							key={f}
							onClick={() => setFilter(f)}
							className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-250 border ${
								filter === f
									? "bg-accent-violet text-white border-accent-violet shadow-glow-violet"
									: "glass border-white/10 text-content-muted hover:border-accent-violet/40 hover:text-content-primary"
							}`}
						>
							{f}
						</button>
					))}
				</div>

				<AnimatePresence mode="wait">
					<motion.div
						key={filter}
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
					>
						{/* Featured card */}
						{featured && (
							<motion.div
								initial={{ opacity: 0, y: 40 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6 }}
								className="relative mb-12 rounded-3xl overflow-hidden glass border border-accent-cyan/20 shadow-glow-cyan"
							>
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
											<h4 className="text-content-primary font-semibold mb-2">Key Features</h4>
											<ul className="list-disc pl-5 space-y-1 text-content-muted text-sm">
												{featured.features.map((f, idx) => (
													<li key={idx}>{f}</li>
												))}
											</ul>
										</div>
									</div>
									<div className="lg:w-[45%] rounded-2xl overflow-hidden border border-accent-cyan/20 shadow-glow-cyan">
										<img
											className="w-full aspect-video object-cover hover:scale-105 transition-transform duration-500"
											src={featured.bannerImgUrl}
											alt={featured.projectTitle}
										/>
									</div>
								</div>
							</motion.div>
						)}

						{/* Grid — all remaining projects */}
						{others.length > 0 && (
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
						)}

						{filtered.length === 0 && (
							<motion.p
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="text-center text-content-muted py-16"
							>
								No projects in this category yet.
							</motion.p>
						)}
					</motion.div>
				</AnimatePresence>
			</div>
		</section>
	);
};

export default Projects;
