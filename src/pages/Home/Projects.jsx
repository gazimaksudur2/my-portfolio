import { m } from 'framer-motion';
import { FiExternalLink, FiGithub, FiServer } from 'react-icons/fi';
import Project from './Project';
import { staggerContainer, viewportOnce } from '../../utils/motion';
import SectionHeader from '../../components/SectionHeader';
import projectsData from '../../data/projects.json';

// Featured project is the one marked featured: true, else first
const featured = projectsData.find((p) => p.featured) ?? projectsData[0];
const others   = projectsData.filter((p) => p !== featured);

const Projects = () => {
  return (
    <section id="projects" className="section-padding bg-bg-primary relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-80 h-80 rounded-full bg-accent-cyan/5 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Real Projects"
          badgeColor="text-accent-violet"
          title="What I've Built"
          titleAccent="Highlights"
          description="Real-world projects including cloud tooling, fintech, agricultural e-commerce, and EdTech platforms — with a focus on scalable architecture and user-centred design."
        />

        {/* ── Featured card ── */}
        {featured && (
          <m.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="relative mb-12 rounded-3xl overflow-hidden glass-card border border-accent-cyan/20 shadow-glow-cyan"
          >
            <div className="absolute inset-0 opacity-30 pointer-events-none bg-gradient-to-br from-accent-cyan/10 via-transparent to-accent-violet/10" aria-hidden="true" />

            <div className="relative z-10 p-6 lg:p-8 flex flex-col-reverse lg:flex-row items-center justify-between gap-8">
              <div className="lg:w-1/2 space-y-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30">
                  Featured · {featured.projectType}
                </span>
                <h3 className="text-2xl lg:text-3xl font-bold font-syne text-content-primary">{featured.projectTitle}</h3>
                <p className="text-content-muted leading-relaxed">{featured.projectDescription}</p>
                <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
                  {featured.skills.slice(0, 5).map((skill, idx) => (
                    <li key={idx} className="px-3 py-1 rounded-full text-sm font-medium bg-accent-violet/10 text-accent-violet border border-accent-violet/30">
                      {skill}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4 text-sm">
                  {featured.liveSiteLink && featured.liveSiteLink !== '#' && (
                    <a href={featured.liveSiteLink} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-accent-cyan hover:glow-cyan font-medium">
                      <FiExternalLink className="w-4 h-4" aria-hidden="true" /> Live site
                    </a>
                  )}
                  {featured.githubClientRepoLink && featured.githubClientRepoLink !== '#' && (
                    <a href={featured.githubClientRepoLink} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-content-muted hover:text-accent-cyan font-medium">
                      <FiGithub className="w-4 h-4" aria-hidden="true" /> GitHub Client
                    </a>
                  )}
                  {featured.githubServerRepoLink && featured.githubServerRepoLink !== '#' && (
                    <a href={featured.githubServerRepoLink} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-content-muted hover:text-accent-cyan font-medium">
                      <FiServer className="w-4 h-4" aria-hidden="true" /> GitHub Server
                    </a>
                  )}
                </div>
                {featured.features && featured.features.length > 0 && (
                  <div>
                    <h4 className="text-content-primary font-semibold mb-2 text-sm">Key Features</h4>
                    <ul className="list-disc pl-5 space-y-1 text-content-muted text-sm">
                      {featured.features.slice(0, 3).map((f, idx) => <li key={idx}>{f}</li>)}
                    </ul>
                  </div>
                )}
              </div>

              {/* Featured image */}
              <div className="group/img lg:w-[45%] relative rounded-2xl overflow-hidden border border-accent-cyan/20 shadow-glow-cyan">
                <img
                  className="w-full aspect-video object-cover group-hover/img:scale-105 transition-transform duration-500"
                  src={featured.bannerImgUrl}
                  alt={featured.projectTitle}
                  loading="eager"
                  decoding="async"
                  width="800"
                  height="450"
                />
                {featured.liveSiteLink && featured.liveSiteLink !== '#' && (
                  <a
                    href={featured.liveSiteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-transparent group-hover/img:bg-black/55 group-hover/img:backdrop-blur-[2px] transition-all duration-300"
                    aria-label={`Visit ${featured.projectTitle} live`}
                  >
                    <div className="opacity-0 scale-75 group-hover/img:opacity-100 group-hover/img:scale-100 transition-all duration-300 p-4 rounded-full bg-accent-cyan/20 border border-accent-cyan/50 shadow-glow-cyan">
                      <FiExternalLink className="w-8 h-8 text-accent-cyan" aria-hidden="true" />
                    </div>
                  </a>
                )}
              </div>
            </div>
          </m.div>
        )}

        {/* ── Grid ── */}
        {others.length > 0 && (
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.12)}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {others.map((project, idx) => (
              <Project key={idx} project={project} />
            ))}
          </m.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
