import type { Metadata } from "next";
import { LegalDocumentPage } from "@/components/pages/LegalDocumentPage";
import { LEGAL_DOCUMENTS } from "@/data/legal_documents_data";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Review the terms for using DoomSphere's website and engaging digital services.",
  alternates: { canonical: "/terms-of-service" },
};

export default function TermsOfServicePage() {
  return (
    <LegalDocumentPage
      document={LEGAL_DOCUMENTS.terms}
      lastUpdated="October 11, 2026"
    />
  );
}
