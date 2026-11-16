"use client";

import { m } from "framer-motion";
import Icon from "@/components/ui/Icon";
import { fadeInUp, staggerContainer, viewportOnce } from "@/utils/motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { scrollToSection } from "@/hooks/useScrollNav";
import type { SiteContent } from "@/lib/schemas";

type AboutProps = {
  about: SiteContent["about"];
  quickFacts: SiteContent["quickFacts"];
  highlights: SiteContent["highlights"];
};

const About = ({ about, quickFacts, highlights }: AboutProps) => {
  return (
    <section
      id="about"
      className="section-padding bg-bg-secondary relative overflow-hidden"
    >
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-accent-violet/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge={about.badge}
          title={about.title}
          titleAccent={about.titleAccent}
          description={about.description}
        />

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-3 space-y-8">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainer(0.2)}
              className="space-y-6"
            >
              <m.h3
                variants={fadeInUp}
                className="text-2xl font-bold font-syne text-content-primary"
              >
                {about.bioHeading}
              </m.h3>
              <div className="space-y-4 text-content-muted leading-relaxed">
                {about.bioParagraphs.map((para) => (
                  <m.p key={para.slice(0, 32)} variants={fadeInUp}>
                    {para}
                  </m.p>
                ))}
              </div>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5 }}
              className="glass-card p-6 rounded-2xl"
            >
              <h4 className="text-lg font-semibold text-content-primary mb-4">
                {about.quickFactsHeading}
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(quickFacts).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <div className="text-sm text-content-muted font-medium capitalize">
                      {key}
                    </div>
                    <div className="text-content-primary font-semibold">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </m.div>
          </div>

          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.12)}
            className="lg:col-span-2 space-y-4"
          >
            <m.h3
              variants={fadeInUp}
              className="text-xl font-bold font-syne text-content-primary mb-2"
            >
              {about.whatIBringHeading}
            </m.h3>
            {highlights.map((highlight) => (
              <m.div
                key={highlight.title}
                variants={fadeInUp}
                className="flex items-start space-x-3 p-4 glass-card rounded-xl border border-accent-cyan/10 hover:border-accent-cyan/30 transition-colors duration-300"
              >
                <div className="p-2.5 bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20 border border-accent-cyan/30 rounded-lg flex-shrink-0">
                  <Icon
                    name={highlight.icon}
                    className="w-5 h-5 text-accent-cyan"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-content-primary">
                    {highlight.title}
                  </h4>
                  <p className="text-content-muted text-sm leading-relaxed mt-1">
                    {highlight.description}
                  </p>
                </div>
              </m.div>
            ))}
          </m.div>
        </div>

        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => scrollToSection("#contact")}
            className="inline-flex items-center px-8 py-4 bg-accent-cyan text-bg-primary font-semibold rounded-xl hover:bg-accent-cyan/90 transition-all duration-300 shadow-glow-cyan hover:shadow-glow-cyan-lg hover:-translate-y-0.5"
          >
            {about.cta}
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </m.div>
      </div>
    </section>
  );
};

export default About;
