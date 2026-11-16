"use client";

import { m } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import Icon from "@/components/ui/Icon";
import SectionHeader from "@/components/ui/SectionHeader";
import { fadeInUp, staggerContainer, viewportOnce } from "@/utils/motion";
import { scrollToSection } from "@/hooks/useScrollNav";
import type { AchievementsFile, Achievement } from "@/lib/schemas";

type AchievementsProps = {
  achievements: AchievementsFile;
};

const AchievementCard = ({ item }: { item: Achievement }) => {
  const isInternal = Boolean(item.link?.startsWith("#"));

  const body = (
    <>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20 border border-accent-cyan/30">
          <Icon
            name={item.icon}
            className="w-6 h-6 text-accent-cyan"
            aria-hidden="true"
          />
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/25">
          {item.year}
        </span>
      </div>

      <h3 className="text-lg lg:text-xl font-bold font-syne text-content-primary mb-2">
        {item.title}
      </h3>
      <p className="text-content-muted text-sm leading-relaxed">
        {item.description}
      </p>

      {item.link && (
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-cyan opacity-80 group-hover:opacity-100 transition-opacity">
          {isInternal ? "View projects" : "View credential"}
          <FiExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        </span>
      )}
    </>
  );

  const cardClass =
    "group w-full text-left h-full p-6 lg:p-7 glass-card rounded-2xl border border-white/10 hover:border-accent-cyan/40 hover:shadow-glow-cyan transition-all duration-300 hover:-translate-y-1 block";

  if (!item.link) {
    return <div className={cardClass}>{body}</div>;
  }

  if (isInternal) {
    return (
      <button
        type="button"
        onClick={() => scrollToSection(item.link!)}
        className={`${cardClass} cursor-pointer`}
      >
        {body}
      </button>
    );
  }

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`${cardClass} cursor-pointer`}
    >
      {body}
    </a>
  );
};

const Achievements = ({ achievements }: AchievementsProps) => {
  const { section, items } = achievements;

  return (
    <section
      id="achievements"
      className="section-padding bg-bg-secondary relative overflow-hidden"
    >
      <div
        className="absolute top-1/4 left-0 w-80 h-80 rounded-full bg-accent-cyan/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge={section.badge}
          badgeColor="text-accent-violet"
          title={section.title}
          titleAccent={section.titleAccent}
          description={section.description}
        />

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.12)}
          className="grid sm:grid-cols-2 gap-6"
        >
          {items.map((item) => (
            <m.div key={item.id} variants={fadeInUp}>
              <AchievementCard item={item} />
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
};

export default Achievements;
