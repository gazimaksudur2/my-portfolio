"use client";

import ContentEditor from "@/components/admin/ContentEditor";
import { getProjects } from "@/lib/content";

const initialData = getProjects();

export default function AdminProjectsPage() {
  return (
    <ContentEditor
      contentKey="projects"
      initialData={initialData}
      title="Projects"
      description="Featured and supporting portfolio projects."
    />
  );
}
