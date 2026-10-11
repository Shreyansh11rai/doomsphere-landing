export interface HomePageHeroData {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: {
    href: string;
    label: string;
  };
  secondaryCta: {
    href: string;
    label: string;
  };
}

import type { IconName } from "@/data/icons_data";

export interface HomePageProofCardData {
  title: string;
  description: string;
  icon: IconName;
}

export interface HomePageInsightCardData {
  title: string;
  text: string;
  icon: IconName;
}

export const HOME_PAGE_DATA = {
  hero: {
    eyebrow: "Websites · Lead Capture · Business Automation",
    title: "Websites that bring you customers, not just visitors.",
    description:
      "We build your online presence, capture leads, and automate your daily operations, so you spend less time on admin and more on growth.",
    primaryCta: {
      href: "#services",
      label: "Explore services",
    },
    secondaryCta: {
      href: "/contact-us",
      label: "Get a free consultation",
    },
  },
  proofCards: [
    {
      title: "Trust",
      description: "Become a trusted provider by our services.",
      icon: "shield",
    },
    {
      title: "Speed",
      description:
        "Improve the response time and other processes of your business.",
      icon: "target",
    },
    {
      title: "Security",
      description:
        "Practical systems that keep your customer journey dependable",
      icon: "lock",
    },
  ],
  coreBusiness: {
    eyebrow: "Our core business",
    title:
      "We help businesses become easier to trust, easier to reach, and easier to work with.",
    description:
      "That usually means a sharper client focused website, a more helpful, connected, reachable experience for clients with whatsapp integration, simple automations that removes repeated work-flows.",
    descriptionSecondary:
      "Our approach stays practical and easy to understand. We speak in business outcomes, not technical jargon.",
  },
  serviceOverview: {
    eyebrow: "Choose what needs attention now",
    title: "Services curated for real customer needs.",
  },
  valueCards: [
    {
      title: "Why customers stay confident",
      text: "Clear pages, useful information, and easy next steps help people trust your business faster.",
      icon: "check",
    },
    {
      title: "Why teams feel in control",
      text: "A better front-office journey means fewer repeated questions and less manual coordination.",
      icon: "chat",
    },
    {
      title: "Why growth becomes easier",
      text: "More organised conversations and a clearer brand experience make it easier to convert and retain.",
      icon: "compass",
    },
  ],
  cta: {
    eyebrow: "Need a practical starting point?",
    title:
      "Start with the customer pain point or the repetitive work which costs you the most time today.",
    primaryCta: {
      href: "/contact-us",
      label: "Let's discuss something specific",
    },
  },
} as const;
