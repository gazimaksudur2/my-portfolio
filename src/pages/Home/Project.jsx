import { m } from 'framer-motion';
import { FiExternalLink, FiGithub, FiServer } from 'react-icons/fi';
import { fadeInUp } from '../../utils/motion';

const Project = ({ project }) => {
  if (!project) return null;

  const hasLive   = project.liveSiteLink && project.liveSiteLink !== '#';
  const hasClient = project.githubClientRepoLink && project.githubClientRepoLink !== '#';
  const hasServer = project.githubServerRepoLink && project.githubServerRepoLink !== '#';

  return (
    <m.article variants={fadeInUp} className="h-full">
      <div className="shimmer-parent group h-full glass-card rounded-2xl border border-white/10 overflow-hidden hover:border-accent-cyan/40 hover:shadow-glow-cyan transition-all duration-300">

        {/* Banner image */}
        <div className="relative overflow-hidden border-b border-white/10 group/img">
          <img
            className="w-full aspect-video object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            src={project.bannerImgUrl}
            alt={project.projectTitle}
            loading="lazy"
            decoding="async"
            width="800"
            height="450"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-card/80 to-transparent pointer-events-none" aria-hidden="true" />
          {hasLive && (
            <a
              href={project.liveSiteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-10 flex items-center justify-center bg-transparent group-hover/img:bg-black/55 group-hover/img:backdrop-blur-[2px] transition-all duration-300"
              aria-label={`Visit ${project.projectTitle} live site`}
            >
              <div className="opacity-0 scale-75 group-hover/img:opacity-100 group-hover/img:scale-100 transition-all duration-300 p-4 rounded-full bg-accent-cyan/20 border border-accent-cyan/50 shadow-glow-cyan">
                <FiExternalLink className="w-8 h-8 text-accent-cyan" aria-hidden="true" />
              </div>
            </a>
          )}
        </div>

        {/* Card body */}
        <div className="p-5">
          <span className="text-accent-cyan font-medium text-xs uppercase tracking-wide">{project.projectType}</span>
          <h3 className="text-lg font-bold font-syne text-content-primary mt-1 mb-2">{project.projectTitle}</h3>
          <p className="text-content-muted text-sm leading-relaxed mb-4 line-clamp-3">{project.projectDescription}</p>

          {/* Tech tags — max 5 */}
          <ul className="flex flex-wrap gap-1.5 mb-4" aria-label="Technologies used">
            {project.skills.slice(0, 5).map((skill, idx) => (
              <li
                key={idx}
                className="px-2 py-0.5 rounded-full text-xs font-medium bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20"
              >
                {skill}
              </li>
            ))}
          </ul>

          {/* Links */}
          <div className="flex flex-wrap gap-3 text-sm">
            {hasLive && (
              <a href={project.liveSiteLink} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-accent-cyan hover:glow-cyan font-medium">
                <FiExternalLink className="w-4 h-4" aria-hidden="true" /> Live site
              </a>
            )}
            {hasClient && (
              <a href={project.githubClientRepoLink} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-content-muted hover:text-accent-cyan font-medium">
                <FiGithub className="w-4 h-4" aria-hidden="true" /> {hasServer ? 'Client' : 'GitHub'}
              </a>
            )}
            {hasServer && (
              <a href={project.githubServerRepoLink} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-content-muted hover:text-accent-cyan font-medium">
                <FiServer className="w-4 h-4" aria-hidden="true" /> Server
              </a>
            )}
          </div>
        </div>
      </div>
    </m.article>
  );
};

export default Project;
