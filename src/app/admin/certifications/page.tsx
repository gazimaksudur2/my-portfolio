"use client";

import ContentEditor from "@/components/admin/ContentEditor";
import { getCertifications } from "@/lib/content";

const initialData = getCertifications();

export default function AdminCertificationsPage() {
  return (
    <ContentEditor
      contentKey="certifications"
      initialData={initialData}
      title="Certifications"
      description="Credentials, issuers, and verification links."
    />
  );
}
