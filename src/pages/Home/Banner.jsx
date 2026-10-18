import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { FiDownload, FiMail, FiGithub, FiLinkedin, FiExternalLink } from 'react-icons/fi';
import { useCountUp } from '../../hooks/useCountUp';
import { scrollToSection } from '../../hooks/useLenis';
import { personalInfo } from '../../constants';

const ROLES = [
  'Software & Cloud Engineer',
  'Full-Stack Engineer',
  'AWS Solutions Architect - Associate',
];

const RESUME_HREF = personalInfo.resumeDriveLink;

const StatCard = ({ number, label, index }) => {
  const { ref, display } = useCountUp(number);
  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="text-center rounded-2xl glass-card p-5"
    >
      <div className="text-3xl lg:text-4xl font-bold font-syne text-gradient mb-1">{display}</div>
      <div className="text-content-muted text-sm font-medium">{label}</div>
    </m.div>
  );
};

const Banner = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 3000);
    return () => clearInterval(id);
  }, []);

  const stats = [
    { number: '5+',  label: 'Projects Shipped' },
    { number: '2+',  label: 'Years AI Training & QA' },
    { number: '15+', label: 'Technologies & Tools' },
    { number: '3+',  label: 'AWS Certifications' },
  ];

  const highlights = [
    { label: 'Bangladesh 🇧🇩', key: 'location' },
    { label: 'CSE, SUST · 2026',   key: 'sust' },
    { label: 'AWS Solutions Architect – Associate', key: 'aws' },
  ];

  return (
    <section
      id="home"
      className="min-h-[100svh] flex items-center justify-center relative overflow-hidden bg-bg-primary"
    >
      {/* Lightweight CSS grid background — no WebGL */}
      <div
        className="absolute inset-0 bg-grid-glow [background-size:40px_40px] pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -right-32 w-96 h-96 rounded-full bg-accent-cyan/8 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-96 h-96 rounded-full bg-accent-violet/8 blur-3xl" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/40 via-transparent to-bg-primary pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Text ── */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <div className="space-y-4">
              {/* Pre-heading */}
              <div className="flex items-center space-x-2 text-accent-cyan font-medium">
                <div className="w-8 h-px bg-accent-cyan" aria-hidden="true" />
                <span>Hello, I&apos;m</span>
              </div>

              {/* Name */}
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold font-syne text-content-primary leading-tight">
                Gazi Maksudur
                <span className="block text-accent-cyan glow-cyan"> Rahman</span>
              </h1>

              {/* Cycling role */}
              <div
                className="text-xl sm:text-2xl text-content-muted font-medium h-10 flex items-center"
                aria-label={`I'm a ${ROLES.join(', ')}`}
              >
                <span className="mr-2" aria-hidden="true">I&apos;m a</span>
                <AnimatePresence mode="wait">
                  <m.span
                    key={roleIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="text-accent-cyan font-semibold glow-cyan"
                    aria-hidden="true"
                  >
                    {ROLES[roleIndex]}
                  </m.span>
                </AnimatePresence>
              </div>

              {/* Bio */}
              <p className="md:text-lg text-content-muted leading-relaxed max-w-xl">
                Software and Cloud Engineer with a B.Sc. in CSE from SUST and AWS Solutions Architect
                certification. I build full-stack applications with TypeScript, Node.js and React,
                and ship them with Docker and Jenkins CI/CD.
              </p>

              {/* Pills */}
              <div className="flex flex-wrap gap-3">
                {highlights.map((h) => (
                  <span
                    key={h.key}
                    className="inline-flex items-center px-4 py-2 glass-card rounded-full text-sm font-medium text-content-primary border border-accent-cyan/20"
                  >
                    {h.label}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={RESUME_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 font-semibold rounded-xl text-bg-primary bg-accent-cyan hover:bg-accent-cyan/90 transition-all duration-300 shadow-glow-cyan hover:shadow-glow-cyan-lg hover:-translate-y-0.5 group"
              >
                <FiDownload className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" aria-hidden="true" />
                Download Resume
                <FiExternalLink className="ml-2 w-4 h-4 opacity-70" aria-hidden="true" />
              </a>
              <button
                onClick={() => scrollToSection('#contact')}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-accent-cyan/50 text-accent-cyan font-semibold rounded-xl hover:bg-accent-cyan/10 hover:border-accent-cyan hover:shadow-glow-cyan transition-all duration-300 group"
              >
                <FiMail className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                Let&apos;s Talk
              </button>
            </div>

            {/* Social */}
            <div className="flex items-center space-x-6 pt-2">
              <span className="text-content-muted font-medium">Connect:</span>
              <div className="flex space-x-4">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="p-3 glass-card rounded-full text-content-primary hover:text-accent-cyan hover:shadow-glow-cyan transition-all duration-300 hover:scale-110"
                >
                  <FiGithub className="w-5 h-5" aria-hidden="true" />
                </a>
                <a
                  href={personalInfo.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="p-3 glass-card rounded-full text-content-primary hover:text-accent-cyan hover:shadow-glow-cyan transition-all duration-300 hover:scale-110"
                >
                  <FiLinkedin className="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </m.div>

          {/* ── Portrait ── */}
          <m.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center"
          >
            <div className="w-72 h-72 lg:w-88 lg:h-88 relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-accent-cyan/40 animate-spin-slow" aria-hidden="true" />
              <div className="absolute inset-3 rounded-full border border-accent-violet/30 animate-glow-pulse" aria-hidden="true" />
              <div className="absolute inset-6 rounded-full bg-gradient-to-br from-accent-cyan/10 to-accent-violet/10 blur-xl" aria-hidden="true" />
              <img
                src="https://i.ibb.co.com/8gQZfPxX/profile-removebg-preview.png"
                alt="Gazi Maksudur Rahman"
                width="320"
                height="320"
                fetchPriority="high"
                decoding="async"
                className="relative w-[80%] h-[80%] object-cover rounded-full shadow-glow-cyan z-10"
              />
            </div>

            {/* Trust badge */}
            <a
              href="https://www.credly.com/badges/8b5b00df-d757-4c1f-9a77-f72e7e020167"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View AWS Solutions Architect Associate credential on Credly"
              className="absolute -bottom-2 -right-2 lg:-bottom-4 lg:-right-4 glass-card rounded-2xl px-3 py-2 shadow-glow-cyan border border-accent-cyan/30 flex items-center gap-2 text-xs font-semibold text-accent-cyan hover:shadow-glow-cyan-lg transition-shadow"
            >
              <span>☁️</span> AWS SAA
            </a>
          </m.div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatCard key={index} number={stat.number} label={stat.label} index={index} />
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <button
        onClick={() => scrollToSection('#projects')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
        aria-label="Scroll to Projects"
      >
        <div className="w-6 h-10 border-2 border-accent-cyan/40 rounded-full flex justify-center" aria-hidden="true">
          <div className="w-1 h-3 bg-accent-cyan rounded-full mt-2 animate-pulse" />
        </div>
      </button>
    </section>
  );
};

export default Banner;
