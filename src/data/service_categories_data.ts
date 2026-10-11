import {
  SERVICE_CATEGORIES,
  type ServiceCategory,
} from "@/data/services_data";
import { SERVICE_CATEGORY_ROUTES } from "@/data/navigation_data";

export interface ServiceCategoryLandingData {
  eyebrow: string;
  title: string;
  description: string;
  benefitTitle: string;
  benefitDescription: string;
  ctaLabel: string;
}

export const SERVICE_CATEGORY_PAGES: Readonly<
  Record<ServiceCategory, ServiceCategoryLandingData>
> = {
  Enquiry: {
    eyebrow: "Make it easier to take the next step",
    title: "A better enquiry should feel effortless.",
    description:
      "Give potential customers a clear path from their first question to a confirmed conversation, appointment, or request.",
    benefitTitle: "Turn interest into a clear next step.",
    benefitDescription:
      "Thoughtful enquiry journeys help customers get the information they need and help your team respond with better context.",
    ctaLabel: "Improve your enquiry journey",
  },
  "WhatsApp Services": {
    eyebrow: "Helpful conversations, made simpler",
    title: "Meet your customers where they already talk.",
    description:
      "Make WhatsApp easier to manage with a considered setup, helpful automation, and clear handoffs to your team.",
    benefitTitle: "Keep conversations moving without losing the human touch.",
    benefitDescription:
      "Useful responses and clear handoffs can reduce repeated admin while keeping people in control of important conversations.",
    ctaLabel: "Plan your WhatsApp setup",
  },
  Websites: {
    eyebrow: "A more useful digital storefront",
    title: "Give every visitor a reason to stay and act.",
    description:
      "Create a clear, mobile-first website or storefront that helps people understand your offer and confidently choose what to do next.",
    benefitTitle: "Help visitors understand, trust, and choose.",
    benefitDescription:
      "Well-structured pages make your services easier to explore and help customers find the right action without unnecessary friction.",
    ctaLabel: "Shape your website",
  },
  Automations: {
    eyebrow: "Less repetitive work, clearer workflows",
    title: "Give your team more room for meaningful work.",
    description:
      "Connect everyday steps into dependable workflows that reduce manual repetition and make handoffs easier to follow.",
    benefitTitle: "Make important work easier to repeat.",
    benefitDescription:
      "A carefully scoped workflow can reduce avoidable admin while keeping decisions and exceptions visible to your team.",
    ctaLabel: "Find a workflow to improve",
  },
  "Marketing & Growth": {
    eyebrow: "Grow with clarity, not guesswork",
    title: "Connect your story to the people looking for it.",
    description:
      "Build a practical path from discovery to decision with helpful content, search improvements, and focused campaigns.",
    benefitTitle: "Make each marketing step easier to understand.",
    benefitDescription:
      "Useful information and clear measurement help you learn what customers respond to and choose sensible improvements.",
    ctaLabel: "Plan your next growth step",
  },
};

export function getServiceCategoryByRoute(
  route: string,
): ServiceCategory | undefined {
  return SERVICE_CATEGORIES.find(
    (category) => SERVICE_CATEGORY_ROUTES[category] === route,
  );
}

export function getServiceCategoryStaticParams() {
  return SERVICE_CATEGORIES.map((category) => ({
    category: SERVICE_CATEGORY_ROUTES[category],
  }));
}
