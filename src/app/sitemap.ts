import type { MetadataRoute } from "next";
import { brand } from "@/config/brand.config";
import { SERVICE_SLUGS } from "@/data/services_data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/about",
    "/contact-us",
    "/faq",
    ...SERVICE_SLUGS.map((slug) => `/${slug}`),
  ];

  return routes.map((route) => ({
    url: new URL(route, brand.siteUrl).toString(),
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
