import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceCategoryPage } from "@/components/pages/services/ServiceCategoryPage";
import {
  getServiceCategoryByRoute,
  getServiceCategoryStaticParams,
  SERVICE_CATEGORY_PAGES,
} from "@/data/service_categories_data";
import { SERVICES_DATA } from "@/data/services_data";
import { SERVICE_CATEGORY_ROUTES } from "@/data/navigation_data";

interface ServiceCategoryRouteProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return getServiceCategoryStaticParams();
}

export async function generateMetadata({
  params,
}: ServiceCategoryRouteProps): Promise<Metadata> {
  const { category: route } = await params;
  const category = getServiceCategoryByRoute(route);
  if (!category) return {};

  const content = SERVICE_CATEGORY_PAGES[category];
  return {
    title: category,
    description: content.description,
    alternates: { canonical: `/services/${SERVICE_CATEGORY_ROUTES[category]}` },
  };
}

export default async function ServiceCategoryRoute({
  params,
}: ServiceCategoryRouteProps) {
  const { category: route } = await params;
  const category = getServiceCategoryByRoute(route);
  if (!category) notFound();

  const services = SERVICES_DATA.filter(
    (service) => service.category === category,
  );

  return (
    <ServiceCategoryPage
      category={category}
      content={SERVICE_CATEGORY_PAGES[category]}
      services={services}
    />
  );
}
