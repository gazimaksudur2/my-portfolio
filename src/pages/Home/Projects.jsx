import { useEffect, useState } from "react";
import Project from "./Project";

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
        <section id="projects" className="section-padding bg-neutral-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-4 py-2 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium mb-4">
                        Real Projects
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
                        What I've Built
                        <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                            Highlights
                        </span>
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                        Real-world projects including fintech and agricultural e-commerce platforms, 
                        with focus on scalable apps and user-centered design.
                    </p>
                </div>

                {featured && (
                    <div className="mb-12 p-6 lg:p-8 bg-white rounded-3xl shadow-lg border border-neutral-100 flex flex-col-reverse lg:flex-row items-center justify-between gap-8">
                        <div className="lg:w-1/2 space-y-4">
                            <span className="text-primary-600 font-medium">{featured.projectType}</span>
                            <h3 className="text-2xl lg:text-3xl font-bold text-neutral-900">
                                {featured.projectTitle}
                            </h3>
                            <p className="text-neutral-600 leading-relaxed">
                                {featured.projectDescription}
                            </p>
                            <ul className="flex flex-wrap gap-2">
                                {featured.skills.map((skill, idx) => (
                                    <li
                                        key={idx}
                                        className="px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700"
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
                                        className="text-primary-600 hover:underline font-medium"
                                    >
                                        Live site
                                    </a>
                                )}
                                {featured.githubClientRepoLink && featured.githubClientRepoLink !== "#" && (
                                    <a
                                        href={featured.githubClientRepoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary-600 hover:underline font-medium"
                                    >
                                        GitHub Client
                                    </a>
                                )}
                                {featured.githubServerRepoLink && featured.githubServerRepoLink !== "#" && (
                                    <a
                                        href={featured.githubServerRepoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary-600 hover:underline font-medium"
                                    >
                                        GitHub Server
                                    </a>
                                )}
                            </div>
                            <div>
                                <h4 className="text-neutral-800 font-semibold mb-2">Features</h4>
                                <ul className="list-disc pl-5 space-y-1 text-neutral-600 text-sm">
                                    {featured.features.map((f, idx) => (
                                        <li key={idx}>{f}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="lg:w-[45%] rounded-2xl overflow-hidden border border-neutral-200 shadow-md">
                            <img
                                className="w-full aspect-video object-cover"
                                src={featured.bannerImgUrl}
                                alt={featured.projectTitle}
                            />
                        </div>
                    </div>
                )}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {others.map((project, idx) => (
                        <Project key={idx} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
