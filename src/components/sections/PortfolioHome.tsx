"use client";

import { useState, useEffect } from "react";
import {
  m,
  AnimatePresence,
  LazyMotion,
  domAnimation,
  MotionConfig,
} from "framer-motion";
import { FiArrowUp } from "react-icons/fi";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProgressBar from "@/components/layout/ProgressBar";
import SectionDots from "@/components/layout/SectionDots";
import CommandPalette from "@/components/layout/CommandPalette";
import Banner from "@/components/sections/Banner";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import About from "@/components/sections/About";
import Education from "@/components/sections/Education";
import Achievements from "@/components/sections/Achievements";
import Certifications from "@/components/sections/Certifications";
import Connect from "@/components/sections/Connect";
import { useHashScroll } from "@/hooks/useScrollNav";
import type { getAllContent } from "@/lib/content";

type PortfolioHomeProps = {
  content: ReturnType<typeof getAllContent>;
};

const PortfolioHome = ({ content }: PortfolioHomeProps) => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { site, projects, experience, education, skills, certifications, achievements } =
    content;

  useHashScroll();

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-accent-cyan focus:text-bg-primary focus:font-semibold focus:rounded-lg"
        >
          Skip to content
        </a>

        <ProgressBar />
        <SectionDots navLinks={site.navLinks} />
        <CommandPalette
          navLinks={site.navLinks}
          personalInfo={site.personalInfo}
        />
        <Navbar navLinks={site.navLinks} personalInfo={site.personalInfo} />

        <main id="main-content" className="pt-16 lg:pt-20">
          <Banner banner={site.banner} personalInfo={site.personalInfo} />
          <Projects projects={projects} />
          <Experience experience={experience} />
          <Skills skills={skills} />
          <About
            about={site.about}
            quickFacts={site.quickFacts}
            highlights={site.highlights}
          />
          <Education education={education} />
          <Achievements achievements={achievements} />
          <Certifications certifications={certifications} />
          <Connect personalInfo={site.personalInfo} />
        </main>

        <Footer navLinks={site.navLinks} personalInfo={site.personalInfo} />

        <AnimatePresence>
          {showBackToTop && (
            <m.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.2 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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

export default PortfolioHome;
