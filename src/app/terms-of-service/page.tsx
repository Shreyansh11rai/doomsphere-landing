import type { Metadata } from "next";
import { InformationalPageView } from "@/components/pages/InformationalPageView";
import { PAGES_DATA } from "@/data/pages_data";

export const metadata: Metadata = {
  title: "Terms of service",
  description: PAGES_DATA["terms-of-service"].description,
  alternates: { canonical: "/terms-of-service" },
};

export default function TermsOfServicePage() {
  return <InformationalPageView page={PAGES_DATA["terms-of-service"]} />;
}
