"use client";

import ContentEditor from "@/components/admin/ContentEditor";
import { getEducation } from "@/lib/content";

const initialData = getEducation();

export default function AdminEducationPage() {
  return (
    <ContentEditor
      contentKey="education"
      initialData={initialData}
      title="Education"
      description="Academic background entries."
    />
  );
}
