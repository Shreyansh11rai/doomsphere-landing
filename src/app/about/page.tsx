import type { Metadata } from "next";
import { AboutPageView } from "@/components/pages/about/AboutPageView";
import { PAGES_DATA } from "@/data/pages_data";

export const metadata: Metadata = {
  title: "About us",
  description: PAGES_DATA.about.description,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutPageView />;
}
