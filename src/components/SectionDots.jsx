import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { scrollToSection } from '../hooks/useLenis';

// Only the sections actually present in Home.jsx (matches navLinks order)
const SECTIONS = [
  { id: 'home',           label: 'Home' },
  { id: 'projects',       label: 'Projects' },
  { id: 'experience',     label: 'Experience' },
  { id: 'skills',         label: 'Skills' },
  { id: 'about',          label: 'About' },
  { id: 'education',      label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact',        label: 'Contact' },
];

const SectionDots = () => {
  const [active, setActive]   = useState('home');
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const observers = SECTIONS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    }).filter(Boolean);
    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <nav
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3"
      aria-label="Section navigation"
    >
      {SECTIONS.map(({ id, label }) => (
        <div
          key={id}
          className="relative flex items-center justify-end"
          onMouseEnter={() => setHovered(id)}
          onMouseLeave={() => setHovered(null)}
        >
          <AnimatePresence>
            {hovered === id && (
              <m.span
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ duration: 0.13 }}
                className="absolute right-5 text-[11px] font-medium text-content-primary glass-card px-2.5 py-1 rounded-lg border border-accent-cyan/20 whitespace-nowrap select-none"
              >
                {label}
              </m.span>
            )}
          </AnimatePresence>

          <button
            onClick={() => scrollToSection(`#${id}`)}
            className="w-2.5 h-2.5 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
            aria-label={`Go to ${label}`}
          >
            <m.span
              animate={
                active === id
                  ? { scale: 1.3, backgroundColor: '#00f5ff', boxShadow: '0 0 8px rgba(0,245,255,0.7)' }
                  : { scale: 1, backgroundColor: 'rgba(255,255,255,0.2)', boxShadow: 'none' }
              }
              transition={{ duration: 0.2 }}
              className="block w-full h-full rounded-full"
            />
          </button>
        </div>
      ))}
    </nav>
  );
};

export default SectionDots;
