"use client";

import ContentEditor from "@/components/admin/ContentEditor";
import { getSite } from "@/lib/content";

const initialData = getSite();

export default function AdminSitePage() {
  return (
    <ContentEditor
      contentKey="site"
      initialData={initialData}
      title="Site / Profile"
      description="Personal info, navigation, banner, about, and SEO content from site.json."
    />
  );
}
