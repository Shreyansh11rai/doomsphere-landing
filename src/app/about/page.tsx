import type { Metadata } from "next";
import { InformationalPageView } from "@/components/pages/InformationalPageView";
import { PAGES_DATA } from "@/data/pages_data";

export const metadata: Metadata = {
  title: "About us",
  description: PAGES_DATA.about.description,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <InformationalPageView page={PAGES_DATA.about} />;
}
