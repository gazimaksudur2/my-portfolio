"use client";

import { m } from "framer-motion";
import Icon from "@/components/ui/Icon";
import { staggerContainer, viewportOnce } from "@/utils/motion";
import SectionHeader from "@/components/ui/SectionHeader";
import type { SkillsFile } from "@/lib/schemas";

type SkillsProps = {
  skills: SkillsFile;
};

const SkillChip = ({ skill, accent }: { skill: string; accent: string }) => (
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

const Skills = ({ skills }: SkillsProps) => {
  const { section, categories, techLogos, marqueeLabel } = skills;

  return (
    <section
      id="skills"
      className="section-padding bg-bg-primary relative overflow-hidden"
    >
      <div
        className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-accent-cyan/5 blur-3xl pointer-events-none"
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
          variants={staggerContainer(0.1)}
          className="space-y-10"
        >
          {categories.map((category) => (
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
                  <Icon
                    name={category.icon}
                    className="w-5 h-5"
                    style={{ color: category.accent }}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-xl font-bold font-syne text-content-primary">
                  {category.title}
                </h3>
                <div
                  className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent"
                  aria-hidden="true"
                />
              </div>

              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <SkillChip
                    key={skill}
                    skill={skill}
                    accent={category.accent}
                  />
                ))}
              </div>
            </m.div>
          ))}
        </m.div>

        <div className="mt-16">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-content-muted/50 mb-5">
            {marqueeLabel}
          </p>
          <div
            className="marquee-track overflow-hidden relative"
            aria-label="Technology logos marquee"
            role="presentation"
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none"
              aria-hidden="true"
            />
            <div className="animate-marquee flex gap-10 w-max">
              {[...techLogos, ...techLogos].map((logo, i) => (
                <div
                  key={`${logo.name}-${i}`}
                  className="flex flex-col items-center gap-1.5 flex-shrink-0"
                  aria-hidden="true"
                >
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
                  <span className="text-[10px] text-content-muted/60 font-medium whitespace-nowrap">
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
