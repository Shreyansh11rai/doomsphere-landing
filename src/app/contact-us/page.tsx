import type { Metadata } from "next";
import { ContactPageView } from "@/components/pages/contact/ContactPageView";
import { PAGES_DATA } from "@/data/pages_data";

export const metadata: Metadata = {
  title: "Contact us",
  description: PAGES_DATA["contact-us"].description,
  alternates: { canonical: "/contact-us" },
};

export default function ContactUsPage() {
  return <ContactPageView />;
}
