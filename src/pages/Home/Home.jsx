import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import Footer from '../../shared/Footer';
import Banner from './Banner';
import Projects from './Projects';
import Experience from './Experience';
import MySkills from './MySkills';
import AboutMe from './AboutMe';
import Education from './Education';
import Certifications from './Certifications';
import Connect from './Connect';
import ProgressBar from '../../components/ProgressBar';
import SectionDots from '../../components/SectionDots';
import CommandPalette from '../../components/CommandPalette';
import { useLenis } from '../../hooks/useLenis';
import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion';

const Home = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Handle /#hash deep-links
  useLenis();

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        {/* Skip to content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-accent-cyan focus:text-bg-primary focus:font-semibold focus:rounded-lg"
        >
          Skip to content
        </a>

        <ProgressBar />
        <SectionDots />
        <CommandPalette />
        <Navbar />

        <main id="main-content" className="pt-16 lg:pt-20">
          <Banner />
          <Projects />
          <Experience />
          <MySkills />
          <AboutMe />
          <Education />
          <Certifications />
          <Connect />
        </main>

        <Footer />

        {/* Back-to-top */}
        <AnimatePresence>
          {showBackToTop && (
            <m.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.2 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-accent-cyan text-bg-primary shadow-glow-cyan hover:bg-accent-cyan/90 hover:-translate-y-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Back to top"
            >
              <FiArrowUp className="w-5 h-5" aria-hidden="true" />
            </m.button>
          )}
        </AnimatePresence>
      </MotionConfig>
    </LazyMotion>
  );
};

export default Home;
