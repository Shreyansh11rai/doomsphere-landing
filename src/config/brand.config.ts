/** Central source of truth for brand copy shared by views and metadata. */
export const brand = {
  name: "DoomSphere | Digital services for businesses",
  shortName: "DS",
  description:
    "Digital services and AI automations designed to move ambitious businesses forward in AI thriving era.",
  siteUrl: "https://doomsphere.com",
  icons: {
    favicon: "/favicon.ico",
    icon: "/icon.png",
    svgIcon: "/icon.svg",
    apple: "/apple-icon.png",
  },
  contactEmail: "hello@doomsphere.com",
  contactNumber: "+918858191942",
  whatsapp: "+919044483322",
  offer: {
    eyebrow: "Independence Day Offer",
    title:
      "Give your business the freedom to go digital with upto 40% off on plans",
    description:
      "Launch with website, WhatsApp, enquiry, and automation bundles built for faster customer action.",
    ctaLabel: "See plans",
    ctaHref: "/pdfs/plans-and-pricing-independence-day.pdf",
  },
} as const;
