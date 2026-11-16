import { z } from "zod";

export const personalInfoSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  tagline: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  location: z.string().min(1),
  logo: z.string().url(),
  resumeLink: z.string().min(1),
  resumeDriveLink: z.string().url(),
  linkedIn: z.string().url(),
  github: z.string().url(),
  facebook: z.string().url(),
});

export const navLinkSchema = z.object({
  to: z.string().min(1),
  label: z.string().min(1),
});

export const highlightSchema = z.object({
  icon: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

export const sectionMetaSchema = z.object({
  badge: z.string().min(1),
  title: z.string().min(1),
  titleAccent: z.string().min(1),
  description: z.string().min(1),
});

export const siteSchema = z.object({
  personalInfo: personalInfoSchema,
  navLinks: z.array(navLinkSchema),
  quickFacts: z.object({
    location: z.string(),
    experience: z.string(),
    availability: z.string(),
    languages: z.string(),
  }),
  highlights: z.array(highlightSchema),
  banner: z.object({
    greeting: z.string(),
    nameFirst: z.string(),
    nameLast: z.string(),
    rolePrefix: z.string(),
    roles: z.array(z.string()),
    bio: z.string(),
    highlights: z.array(z.object({ label: z.string(), key: z.string() })),
    stats: z.array(z.object({ number: z.string(), label: z.string() })),
    cta: z.object({
      resume: z.string(),
      talk: z.string(),
      connectLabel: z.string(),
      scrollAria: z.string(),
    }),
    portrait: z.object({
      src: z.string().url(),
      alt: z.string(),
      width: z.number(),
      height: z.number(),
    }),
    trustBadge: z.object({
      href: z.string().url(),
      label: z.string(),
      ariaLabel: z.string(),
    }),
  }),
  about: z.object({
    badge: z.string(),
    title: z.string(),
    titleAccent: z.string(),
    description: z.string(),
    bioHeading: z.string(),
    bioParagraphs: z.array(z.string()),
    quickFactsHeading: z.string(),
    whatIBringHeading: z.string(),
    cta: z.string(),
  }),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    ogImage: z.string().url(),
    canonical: z.string().url(),
  }),
});

export const projectSchema = z.object({
  id: z.string().min(1),
  featured: z.boolean().optional(),
  projectType: z.string().min(1),
  projectTitle: z.string().min(1),
  projectDescription: z.string().min(1),
  skills: z.array(z.string()),
  liveSiteLink: z.string().url(),
  githubClientRepoLink: z.string().url().nullable(),
  githubServerRepoLink: z.string().url().nullable(),
  bannerImgUrl: z.string().url(),
  features: z.array(z.string()),
});

export const projectsFileSchema = z.object({
  section: sectionMetaSchema,
  items: z.array(projectSchema),
});

export const experienceItemSchema = z.object({
  id: z.string().min(1),
  period: z.string().min(1),
  title: z.string().min(1),
  org: z.string().min(1),
  icon: z.string().min(1),
  current: z.boolean(),
  tech: z.array(z.string()),
  points: z.array(z.string()),
});

export const experienceFileSchema = z.object({
  section: sectionMetaSchema,
  items: z.array(experienceItemSchema),
});

export const educationItemSchema = z.object({
  id: z.string().min(1),
  period: z.string().min(1),
  degree: z.string().min(1),
  institution: z.string().min(1),
  institutionShort: z.string().min(1),
  cgpa: z.string().optional(),
  focus: z.string().optional(),
  logo: z.string().url(),
  primary: z.boolean(),
});

export const educationFileSchema = z.object({
  section: sectionMetaSchema,
  items: z.array(educationItemSchema),
});

export const skillCategorySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  icon: z.string().min(1),
  accent: z.string().min(1),
  skills: z.array(z.string()),
});

export const skillsFileSchema = z.object({
  section: sectionMetaSchema,
  marqueeLabel: z.string(),
  categories: z.array(skillCategorySchema),
  techLogos: z.array(z.object({ name: z.string(), url: z.string().url() })),
});

export const certificationSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  issuer: z.string().min(1),
  platform: z.string().min(1),
  date: z.string().min(1),
  credentialId: z.string().optional(),
  certificateUrl: z.string().url(),
  type: z.string().min(1),
  description: z.string().min(1),
  verificationUrl: z.string().url(),
  tags: z.array(z.string()),
});

export const certificationsFileSchema = z.object({
  section: sectionMetaSchema,
  items: z.array(certificationSchema),
});

export const achievementSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  year: z.string().min(1),
  icon: z.string().min(1),
  link: z.string().nullable(),
});

export const achievementsFileSchema = z.object({
  section: sectionMetaSchema,
  items: z.array(achievementSchema),
});

export type SiteContent = z.infer<typeof siteSchema>;
export type Project = z.infer<typeof projectSchema>;
export type ProjectsFile = z.infer<typeof projectsFileSchema>;
export type ExperienceItem = z.infer<typeof experienceItemSchema>;
export type ExperienceFile = z.infer<typeof experienceFileSchema>;
export type EducationItem = z.infer<typeof educationItemSchema>;
export type EducationFile = z.infer<typeof educationFileSchema>;
export type SkillsFile = z.infer<typeof skillsFileSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type CertificationsFile = z.infer<typeof certificationsFileSchema>;
export type Achievement = z.infer<typeof achievementSchema>;
export type AchievementsFile = z.infer<typeof achievementsFileSchema>;

export const CONTENT_FILES = [
  "site",
  "projects",
  "experience",
  "education",
  "skills",
  "certifications",
  "achievements",
] as const;

export type ContentFileKey = (typeof CONTENT_FILES)[number];

export const contentSchemas = {
  site: siteSchema,
  projects: projectsFileSchema,
  experience: experienceFileSchema,
  education: educationFileSchema,
  skills: skillsFileSchema,
  certifications: certificationsFileSchema,
  achievements: achievementsFileSchema,
} as const;
