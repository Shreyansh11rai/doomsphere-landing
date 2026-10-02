import Link from "next/link";
import { brand } from "@/config/brand.config";
import { Button } from "@/components/shared/Button";
import { IconComp } from "@/components/layout/widgets/IconComp";
import type { InformationalPageData } from "@/data/pages_data";

interface InformationalPageViewProps {
  page: InformationalPageData;
}

export function InformationalPageView({ page }: InformationalPageViewProps) {
  return (
    <main className="">
      {/* <section className="mx-auto grid grid-cols-6 gap-10 max-w-7xl px-6 py-20 sm:py-28 lg:px-8"> */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8 flex items-center justify-between gap-10">
        <div className="">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <IconComp name={page.icon ?? "service"} className="h-7 w-7" />
            </span>
            <p className="text-lg font-bold tracking-[.18em] text-primary uppercase">
              {page.eyebrow}
            </p>
          </div>

          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            {page.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            {page.description}
          </p>
          {/* {page.image && (
            <div className="sm:hidden w-90 col-start-5 flex items-center justify-end col-span-1">
              <img
                src={`/svg/${page.image}`}
                alt="person planning business"
                className="object-cover w-full"
              />
            </div>
          )} */}

          {page.ctas && page.ctas.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {page.ctas.map((cta) => (
                <Button
                  key={cta.label}
                  href={cta.href}
                  variant={cta.kind === "primary" ? "primary" : "secondary"}
                  size="lg"
                  radius="lg"
                >
                  {cta.label}
                </Button>
              ))}
            </div>
          )}
        </div>
        {/* {page.image && (
          <div className="hidden w-90 col-start-5 flex items-center justify-end col-span-1">
            <img
              src={`/svg/${page.image}`}
              alt="person planning business"
              className="object-cover w-full"
            />
          </div>
        )} */}
      </section>

      <section className="border-y border-border bg-surface-muted">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {page.sections.map((section, index) => (
              <article
                key={section.title}
                className="group relative overflow-hidden rounded-xl border border-border bg-surface p-6 transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-primary/10 blur-2xl" />
                <div className="relative flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <IconComp name={section.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-lg font-semibold text-primary">
                      0{index + 1}
                    </p>
                    <h2 className="mt-4 text-xl font-semibold text-foreground">
                      {section.title}
                    </h2>
                    <p className="mt-3 leading-6 text-muted">
                      {section.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/#services"
            className="font-semibold text-primary hover:text-primary-hover"
          >
            Explore all services <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
