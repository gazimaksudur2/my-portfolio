const Project = ({ project }) => {
    if (!project) return null;

    const hasLive = project.liveSiteLink && project.liveSiteLink !== "#";
    const hasClient = project.githubClientRepoLink && project.githubClientRepoLink !== "#";
    const hasServer = project.githubServerRepoLink && project.githubServerRepoLink !== "#";

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-neutral-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="rounded-t-2xl overflow-hidden border-b border-neutral-100">
                <img
                    className="w-full aspect-video object-cover"
                    src={project.bannerImgUrl}
                    alt={project.projectTitle}
                />
            </div>
            <div className="p-6">
                <span className="text-primary-600 font-medium text-sm">{project.projectType}</span>
                <h3 className="text-xl font-bold text-neutral-900 mt-1 mb-2">{project.projectTitle}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed mb-4">{project.projectDescription}</p>
                <ul className="flex flex-wrap gap-2 mb-4">
                    {project.skills.map((skill, idx) => (
                        <li key={idx} className="px-2 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700">
                            {skill}
                        </li>
                    ))}
                </ul>
                <div className="flex flex-wrap gap-3 text-sm">
                    {hasLive && (
                        <a
                            href={project.liveSiteLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:underline font-medium"
                        >
                            Live site
                        </a>
                    )}
                    {hasClient && (
                        <a
                            href={project.githubClientRepoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:underline font-medium"
                        >
                            GitHub
                        </a>
                    )}
                    {hasServer && (
                        <a
                            href={project.githubServerRepoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:underline font-medium"
                        >
                            Server
                        </a>
                    )}
                </div>
                <ul className="mt-4 list-disc pl-5 space-y-1 text-neutral-600 text-xs">
                    {project.features.slice(0, 2).map((f, idx) => (
                        <li key={idx}>{f}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Project;
