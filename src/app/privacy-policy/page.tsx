import type { Metadata } from "next";
import { InformationalPageView } from "@/components/pages/InformationalPageView";
import { PAGES_DATA } from "@/data/pages_data";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: PAGES_DATA["privacy-policy"].description,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return <InformationalPageView page={PAGES_DATA["privacy-policy"]} />;
}
