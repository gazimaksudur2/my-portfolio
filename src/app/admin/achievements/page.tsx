"use client";

import ContentEditor from "@/components/admin/ContentEditor";
import { getAchievements } from "@/lib/content";

const initialData = getAchievements();

export default function AdminAchievementsPage() {
  return (
    <ContentEditor
      contentKey="achievements"
      initialData={initialData}
      title="Achievements"
      description="Highlights and milestone entries."
    />
  );
}
