"use client";

import Link from "next/link";
import { getAllContent } from "@/lib/content";

const content = getAllContent();

const SECTIONS = [
  {
    href: "/admin/site/",
    label: "Site / Profile",
    count: 1,
    detail: content.site.personalInfo.name,
  },
  {
    href: "/admin/projects/",
    label: "Projects",
    count: content.projects.items.length,
    detail: "portfolio projects",
  },
  {
    href: "/admin/experience/",
    label: "Experience",
    count: content.experience.items.length,
    detail: "roles",
  },
  {
    href: "/admin/education/",
    label: "Education",
    count: content.education.items.length,
    detail: "entries",
  },
  {
    href: "/admin/skills/",
    label: "Skills",
    count: content.skills.categories.length,
    detail: "categories",
  },
  {
    href: "/admin/certifications/",
    label: "Certifications",
    count: content.certifications.items.length,
    detail: "credentials",
  },
  {
    href: "/admin/achievements/",
    label: "Achievements",
    count: content.achievements.items.length,
    detail: "highlights",
  },
] as const;

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="mb-2 font-syne text-xs uppercase tracking-[0.2em] text-accent-cyan">
          Overview
        </p>
        <h1 className="font-syne text-3xl font-bold text-content-primary">
          Content dashboard
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-content-muted">
          Edit bundled JSON content, validate against schemas, then commit to
          GitHub or download a local file. Counts reflect the static build
          bundle.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {SECTIONS.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="glass-card group rounded-2xl p-5 transition hover:border-accent-cyan/40"
          >
            <p className="text-sm text-content-muted">{section.label}</p>
            <p className="mt-2 font-syne text-3xl font-bold text-accent-cyan">
              {section.count}
            </p>
            <p className="mt-1 text-sm text-content-muted group-hover:text-content-primary">
              {section.detail}
            </p>
          </Link>
        ))}
      </div>

      <section className="glass-card rounded-2xl p-5">
        <h2 className="font-syne text-lg font-semibold text-content-primary">
          Quick links
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {SECTIONS.map((section) => (
            <li key={section.href}>
              <Link
                href={section.href}
                className="inline-block rounded-lg border border-white/10 px-3 py-1.5 text-sm text-content-muted hover:border-accent-cyan/40 hover:text-accent-cyan"
              >
                Edit {section.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
