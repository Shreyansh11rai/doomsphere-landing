import type { Metadata } from "next";
import { PricingPageView } from "@/components/pages/pricing/PricingPageView";

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "Request a tailored quote for websites, WhatsApp automation, and business support services.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return <PricingPageView />;
}
