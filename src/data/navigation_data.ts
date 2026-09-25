import { SERVICES_DATA, type ServiceCategory } from "@/data/services_data";

export interface NavigationItem {
  href: string;
  label: string;
  description: string;
  icon: NavigationIcon;
}

export type NavigationIcon = "about" | "contact" | "faq" | "home" | "service";

export const PAGE_NAVIGATION: readonly NavigationItem[] = [
  {
    href: "/",
    label: "Home",
    description: "Explore what we do.",
    icon: "home",
  },
  {
    href: "/about",
    label: "About us",
    description: "Meet the way we work.",
    icon: "about",
  },
  {
    href: "/contact-us",
    label: "Contact us",
    description: "Start a conversation.",
    icon: "contact",
  },
  {
    href: "/faq",
    label: "FAQ",
    description: "Find useful answers.",
    icon: "faq",
  },
];

export const SERVICE_CATEGORY_TABS: readonly (
  | "All services"
  | ServiceCategory
)[] = [
  "All services",
  "Enquiry",
  "WhatsApp Services",
  "Websites",
  "Automations",
  "Marketing & Growth",
];

export function getServicesForCategory(
  category: "All services" | ServiceCategory,
) {
  return SERVICES_DATA.filter(
    (service) => category === "All services" || service.category === category,
  )
    .slice()
    .sort((first, second) => first.name.localeCompare(second.name));
}
