import type { MetadataRoute } from "next";
import { brand } from "@/config/brand.config";
import { SERVICE_SLUGS } from "@/data/services_data";
import { SERVICE_CATEGORIES } from "@/data/services_data";
import { getServiceCategoryHref } from "@/data/navigation_data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/about",
    "/contact-us",
    "/faq",
    "/privacy-policy",
    "/terms-of-service",
    ...SERVICE_CATEGORIES.map((category) => getServiceCategoryHref(category)),
    ...SERVICE_SLUGS.map((slug) => `/${slug}`),
  ];

  return routes.map((route) => ({
    url: new URL(route, brand.siteUrl).toString(),
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
