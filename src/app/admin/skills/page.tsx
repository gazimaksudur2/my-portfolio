"use client";

import ContentEditor from "@/components/admin/ContentEditor";
import { getSkills } from "@/lib/content";

const initialData = getSkills();

export default function AdminSkillsPage() {
  return (
    <ContentEditor
      contentKey="skills"
      initialData={initialData}
      title="Skills"
      description="Skill categories and marquee tech logos. Use Advanced JSON for techLogos."
    />
  );
}
