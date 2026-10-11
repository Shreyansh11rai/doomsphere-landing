import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/pages/LegalDocumentPage";
import { LEGAL_DOCUMENTS } from "@/data/legal_documents_data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how DoomSphere handles personal information for website enquiries and digital projects.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalDocumentPage
      document={LEGAL_DOCUMENTS.privacy}
      lastUpdated="October 11, 2026"
    />
  );
}
