import type { Metadata } from "next";
import { ServicePageView } from "@/components/pages/services/ServicePageVIew";
import { SERVICE_SLUGS } from "@/data/services_data";
import { getServiceBySlug } from "@/lib/services.util";
import { notFound } from "next/navigation";

interface ServiceRouteProps {
  params: Promise<{ service: string }>;
}

export function generateStaticParams() {
  return SERVICE_SLUGS.map((service) => ({ service }));
}

// export const dynamicParams = false;

export async function generateMetadata({
  params,
}: ServiceRouteProps): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.description,
    alternates: { canonical: `/${service.slug}` },
    openGraph: {
      title: service.name,
      description: service.description,
      url: `/${service.slug}`,
    },
    twitter: { title: service.name, description: service.description },
  };
}

export default async function ServicePage({ params }: ServiceRouteProps) {
  const { service } = await params;
  const serviceData = getServiceBySlug(service);
  if (!serviceData) notFound();
  return <ServicePageView service={serviceData} />;
}
