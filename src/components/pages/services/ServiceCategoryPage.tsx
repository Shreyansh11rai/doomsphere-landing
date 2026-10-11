import Image from "next/image";
import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";
import { IconComp } from "@/components/layout/widgets/IconComp";
import { Button } from "@/components/shared/Button";
import type { ServiceData, ServiceCategory } from "@/data/services_data";
import type { ServiceCategoryLandingData } from "@/data/service_categories_data";

interface ServiceCategoryPageProps {
  category: ServiceCategory;
  content: ServiceCategoryLandingData;
  services: readonly ServiceData[];
}

export function ServiceCategoryPage({
  category,
  content,
  services,
}: ServiceCategoryPageProps) {
  const [featuredService, ...otherServices] = services;
  const exploreHref =
    otherServices.length > 0 ? "#category-gallery" : "/contact-us";

  return (
    <main>
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <p className="text-lg font-bold tracking-[.18em] text-primary uppercase">
          {category}
        </p>
        <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-end">
          <div>
            <p className="text-sm font-semibold tracking-wide text-primary">
              {content.eyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
              {content.title}
            </h1>
          </div>
          <div>
            <p className="text-base leading-7 text-muted sm:text-lg">
              {content.description}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href={exploreHref} size="lg" radius="lg">
                <IconComp name="service" className="h-4 w-4" />
                {otherServices.length > 0 ? "Explore services" : "Discuss your needs"}
              </Button>
              <Button
                href="/contact-us"
                variant="secondary"
                size="lg"
                radius="lg"
              >
                <IconComp name="chat" className="h-4 w-4" />
                Talk through your needs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {featuredService && (
        <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-6 sm:pb-16 lg:px-8">
          <Link
            href={`/${featuredService.slug}`}
            className="group grid overflow-hidden rounded-[2rem] border border-border bg-surface transition hover:border-primary/50 sm:min-h-[26rem] lg:grid-cols-2"
          >
            <div className="flex min-h-60 items-center justify-center bg-canvas p-8 sm:p-12">
              <Image
                src={featuredService.illustration}
                alt=""
                width={560}
                height={380}
                priority
                className="h-56 w-full object-contain transition-transform duration-500 group-hover:scale-105 sm:h-72"
              />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
              <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                Featured service · {featuredService.eyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {featuredService.name}
              </h2>
              <p className="mt-4 max-w-xl leading-7 text-muted">
                {featuredService.description}
              </p>
              <span className="mt-7 inline-flex items-center gap-2 font-semibold text-primary">
                Explore this service <BsArrowUpRight aria-hidden="true" />
              </span>
            </div>
          </Link>
        </section>
      )}

      {otherServices.length > 0 && (
        <section
          id="category-gallery"
          className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8"
        >
          {services.length > 1 && (
            <div className="max-w-2xl">
              <p className="text-sm font-bold tracking-[.18em] text-primary uppercase">
                Explore the collection
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Choose the help that fits your next step.
              </h2>
            </div>
          )}
          <div className="mt-8 grid auto-rows-fr grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3">
            {otherServices.map((service) => (
            <article
              key={service.slug}
              className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-surface transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
            >
              <Link
                href={`/${service.slug}`}
                aria-label={`Explore ${service.name}`}
                className="flex h-56 shrink-0 items-center justify-center bg-canvas p-6 sm:h-64"
              >
                <Image
                  src={service.illustration}
                  alt=""
                  width={420}
                  height={280}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                  {service.eyebrow}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-foreground">
                  {service.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted">
                  {service.summary}
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  <Button
                    href={`/${service.slug}`}
                    variant="secondary"
                    className="w-full justify-between"
                  >
                    <span className="inline-flex items-center gap-2">
                      <IconComp name={service.icon} className="h-4 w-4" />
                      Learn more
                    </span>
                    <BsArrowUpRight aria-hidden="true" />
                  </Button>
                  <Button
                    href={`/contact-us?service=${encodeURIComponent(service.name)}`}
                    className="w-full justify-between"
                  >
                    <span className="inline-flex items-center gap-2">
                      <IconComp name="pricing" className="h-4 w-4" />
                      Get a quote
                    </span>
                    <BsArrowUpRight aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
          </div>
        </section>
      )}

      <section className="border-y border-border bg-surface-muted">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-12 sm:px-6 sm:py-16 md:grid-cols-[minmax(0,1fr)_auto] md:items-center lg:px-8">
          <div>
            <p className="text-sm font-bold tracking-[.18em] text-primary uppercase">
              A practical place to start
            </p>
            <h2 className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {content.benefitTitle}
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-muted">
              {content.benefitDescription}
            </p>
          </div>
          <Button href="/contact-us" size="lg" radius="lg">
            <IconComp name="chat" className="h-4 w-4" />
            {content.ctaLabel}
            <BsArrowUpRight aria-hidden="true" />
          </Button>
        </div>
      </section>
    </main>
  );
}
