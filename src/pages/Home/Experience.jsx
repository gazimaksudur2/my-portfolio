import { m } from 'framer-motion';
import { FiCode, FiBriefcase } from 'react-icons/fi';
import { fadeInUp, staggerContainer, viewportOnce } from '../../utils/motion';
import SectionHeader from '../../components/SectionHeader';

const experiences = [
  {
    period: 'Sept 2026 – Present',
    title: 'Software Engineer Intern',
    org: 'W3 Engineers LTD. · Dhaka, Bangladesh',
    icon: FiCode,
    current: true,
    tech: ['Go', 'Beego', 'Node.js', 'React', 'Next.js', 'Python'],
    points: [
      'Joined a live project team contributing to backend API development and production application workflows.',
      'Built and maintained RESTful API endpoints and integration tests using Go (Beego) and Python (Flask).',
      'Completed intensive full-stack training covering modern AI and automation techniques including LLMs and MCP.',
    ],
  },
  {
    period: 'Mar 2024 – Feb 2026',
    title: 'AI Software Trainer & QA Specialist',
    org: 'Outlier AI · Remote',
    icon: FiBriefcase,
    current: false,
    tech: ['Python', 'JavaScript', 'C++', 'Code Review', 'RLHF'],
    points: [
      'Contributed to large-scale RLHF pipelines evaluating code quality, security, and logic in AI-generated solutions across Python, JavaScript, and C++.',
      'Identified logic flaws, anti-patterns, and security vulnerabilities; provided comparative rankings to improve model reasoning and accuracy.',
      'Reviewed thousands of code samples for quality and correctness, contributing to measurable improvements in model output.',
    ],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="section-padding bg-bg-secondary relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-accent-violet/5 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Experience"
          title="Professional"
          titleAccent="Experience"
          description="A mix of production software engineering and rigorous AI quality evaluation."
        />

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.15)}
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
        >
          {experiences.map((exp, index) => {
            const IconComponent = exp.icon;
            return (
              <m.article
                key={index}
                variants={fadeInUp}
                className="group h-full p-6 lg:p-8 glass-card rounded-2xl border border-white/10 hover:border-accent-cyan/40 hover:shadow-glow-cyan transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="inline-flex p-3 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20">
                    <IconComponent className="w-6 h-6 text-accent-cyan" aria-hidden="true" />
                  </div>
                  {exp.current && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-green/25 bg-accent-green/10 text-accent-green text-xs font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-green" aria-hidden="true" />
                      Current
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium text-accent-cyan">{exp.period}</p>
                <h3 className="text-xl lg:text-2xl font-bold font-syne text-content-primary mt-1">{exp.title}</h3>
                <p className="text-content-muted font-medium mt-1 mb-4">{exp.org}</p>

                {/* Tech stack used */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {exp.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 text-xs rounded-full bg-accent-cyan/8 text-accent-cyan border border-accent-cyan/20">
                      {t}
                    </span>
                  ))}
                </div>

                <ul className="space-y-2.5">
                  {exp.points.map((point, idx) => (
                    <li key={idx} className="flex items-start text-content-muted text-sm leading-relaxed">
                      <span className="w-1.5 h-1.5 bg-accent-cyan rounded-full mt-2 mr-3 flex-shrink-0" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </m.article>
            );
          })}
        </m.div>
      </div>
    </section>
  );
};

export default Experience;
