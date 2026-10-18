import { m } from 'framer-motion';
import { FiCode, FiServer, FiDatabase, FiCloud, FiTool } from 'react-icons/fi';
import { staggerContainer, viewportOnce } from '../../utils/motion';
import SectionHeader from '../../components/SectionHeader';

const skillCategories = [
  {
    id: 'languages',
    title: 'Languages',
    icon: FiTool,
    accent: '#00f5ff',
    skills: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'Java', 'C++', 'Go'],
  },
  {
    id: 'backend',
    title: 'Backend & DB',
    icon: FiServer,
    accent: '#7c3aed',
    skills: ['Node.js', 'Express.js', 'Beego', 'PostgreSQL', 'MongoDB', 'FastAPI', 'REST APIs'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: FiCode,
    accent: '#00ff88',
    skills: ['React.js', 'Next.js', 'Tailwind CSS', 'HTML5', 'CSS3'],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    icon: FiCloud,
    accent: '#00f5ff',
    skills: ['AWS Solutions Architect', 'AWS Cloud Practitioner', 'Docker', 'Jenkins', 'CI/CD'],
  },
  {
    id: 'core',
    title: 'Core Concepts',
    icon: FiDatabase,
    accent: '#7c3aed',
    skills: ['OOP', 'Data Structures & Algorithms', 'MVC', 'Agile', 'Git', 'GitHub', 'Postman'],
  },
];

// Tech logos for the marquee — hosted on svgrepo (small SVGs, no large deps)
const TECH_LOGOS = [
  { name: 'React',       url: 'https://www.svgrepo.com/show/452092/react.svg' },
  { name: 'TypeScript',  url: 'https://www.svgrepo.com/show/349540/typescript.svg' },
  { name: 'Node.js',     url: 'https://www.svgrepo.com/show/452075/node-js.svg' },
  { name: 'Python',      url: 'https://www.svgrepo.com/show/452091/python.svg' },
  { name: 'MongoDB',     url: 'https://www.svgrepo.com/show/439231/mongodb.svg' },
  { name: 'PostgreSQL',  url: 'https://www.svgrepo.com/show/354200/postgresql.svg' },
  { name: 'AWS',         url: 'https://www.svgrepo.com/show/448266/aws.svg' },
  { name: 'Docker',      url: 'https://www.svgrepo.com/show/448221/docker.svg' },
  { name: 'Jenkins',     url: 'https://www.svgrepo.com/show/373699/jenkins.svg' },
  { name: 'GitHub',      url: 'https://www.svgrepo.com/show/512317/github-142.svg' },
];

const SkillChip = ({ skill, accent }) => (
  <span
    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border transition-colors duration-200 hover:opacity-90"
    style={{
      backgroundColor: `${accent}14`,
      borderColor: `${accent}40`,
      color: accent,
    }}
  >
    {skill}
  </span>
);

const MySkills = () => {
  return (
    <section id="skills" className="section-padding bg-bg-primary relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-accent-cyan/5 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Technical Skills"
          title="What I Work With"
          titleAccent="By Category"
          description="A continuously expanding toolkit spanning languages, frameworks, cloud platforms, and core engineering concepts."
        />

        {/* Categories */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="space-y-10"
        >
          {skillCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <m.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="inline-flex p-2.5 rounded-xl border"
                    style={{
                      borderColor: `${category.accent}55`,
                      background: `${category.accent}14`,
                      boxShadow: `0 0 16px ${category.accent}30`,
                    }}
                  >
                    <IconComponent className="w-5 h-5" style={{ color: category.accent }} aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold font-syne text-content-primary">{category.title}</h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" aria-hidden="true" />
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <SkillChip key={skill} skill={skill} accent={category.accent} />
                  ))}
                </div>
              </m.div>
            );
          })}
        </m.div>

        {/* Tech logo marquee */}
        <div className="mt-16">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-content-muted/50 mb-5">
            Core technologies
          </p>
          <div className="marquee-track overflow-hidden relative" aria-label="Technology logos marquee" role="presentation">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" aria-hidden="true" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" aria-hidden="true" />
            <div className="animate-marquee flex gap-10 w-max">
              {[...TECH_LOGOS, ...TECH_LOGOS].map((logo, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 flex-shrink-0" aria-hidden="true">
                  <div className="w-10 h-10 glass-card rounded-lg border border-white/10 flex items-center justify-center p-1.5">
                    <img
                      src={logo.url}
                      alt=""
                      className="w-full h-full object-contain opacity-70"
                      loading="lazy"
                      decoding="async"
                      width="32"
                      height="32"
                    />
                  </div>
                  <span className="text-[10px] text-content-muted/60 font-medium whitespace-nowrap">{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MySkills;
