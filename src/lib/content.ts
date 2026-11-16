import site from "../../content/site.json";
import projects from "../../content/projects.json";
import experience from "../../content/experience.json";
import education from "../../content/education.json";
import skills from "../../content/skills.json";
import certifications from "../../content/certifications.json";
import achievements from "../../content/achievements.json";
import {
  siteSchema,
  projectsFileSchema,
  experienceFileSchema,
  educationFileSchema,
  skillsFileSchema,
  certificationsFileSchema,
  achievementsFileSchema,
  type SiteContent,
  type ProjectsFile,
  type ExperienceFile,
  type EducationFile,
  type SkillsFile,
  type CertificationsFile,
  type AchievementsFile,
  type ContentFileKey,
} from "./schemas";

export function getSite(): SiteContent {
  return siteSchema.parse(site);
}

export function getProjects(): ProjectsFile {
  return projectsFileSchema.parse(projects);
}

export function getExperience(): ExperienceFile {
  return experienceFileSchema.parse(experience);
}

export function getEducation(): EducationFile {
  return educationFileSchema.parse(education);
}

export function getSkills(): SkillsFile {
  return skillsFileSchema.parse(skills);
}

export function getCertifications(): CertificationsFile {
  return certificationsFileSchema.parse(certifications);
}

export function getAchievements(): AchievementsFile {
  return achievementsFileSchema.parse(achievements);
}

export function getAllContent() {
  return {
    site: getSite(),
    projects: getProjects(),
    experience: getExperience(),
    education: getEducation(),
    skills: getSkills(),
    certifications: getCertifications(),
    achievements: getAchievements(),
  };
}

export const contentFilePaths: Record<ContentFileKey, string> = {
  site: "content/site.json",
  projects: "content/projects.json",
  experience: "content/experience.json",
  education: "content/education.json",
  skills: "content/skills.json",
  certifications: "content/certifications.json",
  achievements: "content/achievements.json",
};
