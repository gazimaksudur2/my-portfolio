"use client";

import { m } from "framer-motion";
import Icon from "@/components/ui/Icon";
import { fadeInUp, staggerContainer, viewportOnce } from "@/utils/motion";
import SectionHeader from "@/components/ui/SectionHeader";
import type { ExperienceFile } from "@/lib/schemas";

type ExperienceProps = {
  experience: ExperienceFile;
};

const Experience = ({ experience }: ExperienceProps) => {
  const { section, items } = experience;

  return (
    <section
      id="experience"
      className="section-padding bg-bg-secondary relative overflow-hidden"
    >
      <div
        className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-accent-violet/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge={section.badge}
          title={section.title}
          titleAccent={section.titleAccent}
          description={section.description}
        />

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.15)}
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
        >
          {items.map((exp) => (
            <m.article
              key={exp.id}
              variants={fadeInUp}
              className="group h-full p-6 lg:p-8 glass-card rounded-2xl border border-white/10 hover:border-accent-cyan/40 hover:shadow-glow-cyan transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="inline-flex p-3 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20">
                  <Icon
                    name={exp.icon}
                    className="w-6 h-6 text-accent-cyan"
                    aria-hidden="true"
                  />
                </div>
                {exp.current && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-green/25 bg-accent-green/10 text-accent-green text-xs font-medium">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-accent-green"
                      aria-hidden="true"
                    />
                    Current
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-accent-cyan">{exp.period}</p>
              <h3 className="text-xl lg:text-2xl font-bold font-syne text-content-primary mt-1">
                {exp.title}
              </h3>
              <p className="text-content-muted font-medium mt-1 mb-4">
                {exp.org}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {exp.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-xs rounded-full bg-accent-cyan/8 text-accent-cyan border border-accent-cyan/20"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <ul className="space-y-2.5">
                {exp.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start text-content-muted text-sm leading-relaxed"
                  >
                    <span
                      className="w-1.5 h-1.5 bg-accent-cyan rounded-full mt-2 mr-3 flex-shrink-0"
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
};

export default Experience;
