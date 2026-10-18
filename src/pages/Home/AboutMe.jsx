import { m } from 'framer-motion';
import Icon from '../../components/Icon';
import { highlights, quickFacts } from '../../constants';
import { fadeInUp, staggerContainer, viewportOnce } from '../../utils/motion';
import SectionHeader from '../../components/SectionHeader';
import { scrollToSection } from '../../hooks/useLenis';

const bioParagraphs = [
  "I'm a Software and Cloud Engineer with a B.Sc. in Computer Science and Engineering from SUST and AWS Solutions Architect certification. I combine full-stack development with TypeScript, Node.js, and React with hands-on experience in REST API design, Docker, Jenkins CI/CD, and cloud architecture.",
  "I currently contribute to backend API development and production workflows at W3 Engineers. Previously, I spent two years at Outlier AI evaluating AI-generated code across Python, JavaScript, and C++, with a focus on quality, security, logic, and clear feedback for RLHF pipelines.",
];

const AboutMe = () => {
  return (
    <section id="about" className="section-padding bg-bg-secondary relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-accent-violet/5 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="About Me"
          title="My Story &"
          titleAccent="Direction"
          description="CSE graduate from SUST and a Software & Cloud Engineer focused on scalable full-stack systems, RESTful APIs, containerisation, and automated delivery. AWS Solutions Architect and Cloud Practitioner certified."
        />

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Bio */}
          <div className="lg:col-span-3 space-y-8">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer(0.2)}
              className="space-y-6"
            >
              <m.h3 variants={fadeInUp} className="text-2xl font-bold font-syne text-content-primary">
                Journey, Motivation & Focus
              </m.h3>
              <div className="space-y-4 text-content-muted leading-relaxed">
                {bioParagraphs.map((para, i) => (
                  <m.p key={i} variants={fadeInUp}>{para}</m.p>
                ))}
              </div>
            </m.div>

            {/* Quick facts */}
            <m.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5 }}
              className="glass-card p-6 rounded-2xl"
            >
              <h4 className="text-lg font-semibold text-content-primary mb-4">Quick Facts</h4>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(quickFacts).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <div className="text-sm text-content-muted font-medium capitalize">{key}</div>
                    <div className="text-content-primary font-semibold">{value}</div>
                  </div>
                ))}
              </div>
            </m.div>
          </div>

          {/* What I bring — right column */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.12)}
            className="lg:col-span-2 space-y-4"
          >
            <m.h3 variants={fadeInUp} className="text-xl font-bold font-syne text-content-primary mb-2">
              What I Bring
            </m.h3>
            {highlights.map((highlight, index) => (
              <m.div
                key={index}
                variants={fadeInUp}
                className="flex items-start space-x-3 p-4 glass-card rounded-xl border border-accent-cyan/10 hover:border-accent-cyan/30 transition-colors duration-300"
              >
                <div className="p-2.5 bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20 border border-accent-cyan/30 rounded-lg flex-shrink-0">
                  <Icon name={highlight.icon} className="w-5 h-5 text-accent-cyan" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-content-primary">{highlight.title}</h4>
                  <p className="text-content-muted text-sm leading-relaxed mt-1">{highlight.description}</p>
                </div>
              </m.div>
            ))}
          </m.div>
        </div>

        {/* CTA */}
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => scrollToSection('#contact')}
            className="inline-flex items-center px-8 py-4 bg-accent-cyan text-bg-primary font-semibold rounded-xl hover:bg-accent-cyan/90 transition-all duration-300 shadow-glow-cyan hover:shadow-glow-cyan-lg hover:-translate-y-0.5"
          >
            Let&apos;s Connect
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </m.div>
      </div>
    </section>
  );
};

export default AboutMe;
