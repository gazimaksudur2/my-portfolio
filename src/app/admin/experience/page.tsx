"use client";

import ContentEditor from "@/components/admin/ContentEditor";
import { getExperience } from "@/lib/content";

const initialData = getExperience();

export default function AdminExperiencePage() {
  return (
    <ContentEditor
      contentKey="experience"
      initialData={initialData}
      title="Experience"
      description="Professional roles and timelines."
    />
  );
}
