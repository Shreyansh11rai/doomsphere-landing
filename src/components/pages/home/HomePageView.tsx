"use client";

import { IconComp } from "@/components/layout/widgets/IconComp";
import { Button } from "@/components/shared/Button";
import { HOME_PAGE_DATA } from "@/data/home_page_data";
import { SERVICES_DATA } from "@/data/services_data";
import { HOME_TESTIMONIALS } from "@/data/testimonials_data";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

/** Static marketing homepage assembled from the service catalogue. */
export function HomePageView() {
  const [expand, setExpand] = useState<boolean>(false);
  const { hero, proofCards, coreBusiness, serviceOverview, valueCards, cta } =
    HOME_PAGE_DATA;

  return (
    <main className="flex flex-col items-center">
      <section className="mx-auto max-w-7xl px-6 py-10 sm:py-20 lg:px-8 lg:py-28">
        <div>
          <p className="text-lg text-center font-semibold tracking-[.18em] text-primary uppercase">
            {hero.eyebrow}
          </p>
          <h1 className="mt-5 text-center max-w-6xl mx-auto text-4xl font-bold tracking-tighter text-foreground sm:text-6xl lg:text-7xl">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-center mx-auto leading-8 text-muted">
            {hero.description}
          </p>

          <div className="flex items-center justify-center">
            <div className="mt-5 md:mt-10 mx-auto flex flex-col sm:flex-row gap-5">
              <Button
                href={hero.primaryCta.href}
                size="lg"
                radius="lg"
                className="text-lg"
              >
                {hero.primaryCta.label}
              </Button>
              <Button
                href={hero.secondaryCta.href}
                variant="secondary"
                size="lg"
                radius="lg"
                className="text-lg"
              >
                {hero.secondaryCta.label}
              </Button>
            </div>
          </div>

          <div className="mx-auto mt-8 flex w-full max-w-sm justify-center sm:mt-12">
            <Image
              className="h-auto max-h-56 w-full object-contain sm:max-h-72"
              src="/img/startup-growth.svg"
              alt="A growing business supported by digital tools"
              width={420}
              height={300}
            />
          </div>
          <div className="mt-20 grid gap-4 sm:grid-cols-3">
            {proofCards.map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-xl border border-border bg-surface p-5 transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="absolute -right-6 -top-6 md:h-20 md:w-20 rounded-full bg-primary/10 blur-2xl" />

                <div className="relative flex gap-4 sm:flex-col sm:items-start lg:flex-row">
                  <span className="flex flex-col p-4 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <IconComp name={item.icon} className="h-10 w-10" />{" "}
                    <p className="text-lg font-semibold text-primary hidden sm:block lg:hidden">
                      {item.title}
                    </p>
                  </span>
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold text-primary sm:hidden lg:block">
                      {item.title}
                    </p>
                    <p className="text-sm leading-6 text-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="services"
        className="mx-auto max-w-7xl px-6 py-20 lg:px-8 border-t border-border"
      >
        <p className="text-lg font-bold tracking-[.18em] text-primary uppercase">
          {serviceOverview.eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
          {serviceOverview.title}
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 sm:mt-10">
          {SERVICES_DATA.map((service, i) => {
            if (i > 5 && !expand) return null;
            return (
              <Link
                href={`/${service.slug}`}
                key={service.slug}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-4 transition duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-5"
              >
                <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-primary/10 blur-2xl transition duration-200 group-hover:scale-110" />
                <div className="relative flex aspect-[16/8] items-center justify-center overflow-hidden rounded-xl bg-canvas p-3">
                  <Image
                    src={service.illustration}
                    alt=""
                    width={260}
                    height={140}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="relative mt-4 text-xs font-semibold tracking-wide text-primary uppercase">
                  {service.eyebrow}
                </p>
                <h3 className="relative mt-3 text-xl font-semibold text-foreground">
                  {service.name}
                </h3>
                <p className="relative mt-2 text-sm leading-6 text-muted">
                  {service.summary}
                </p>
                <p className="relative mt-5 text-sm font-semibold text-foreground group-hover:text-primary">
                  Explore service <span aria-hidden="true">↗</span>
                </p>
              </Link>
            );
          })}
        </div>
        <Button
          className="float-right flex items-center gap-2 mt-5"
          onClick={() => setExpand(!expand)}
        >
          {expand ? "Collapse" : "Expand"} service list
          <IoIosArrowDown className={expand ? "rotate-180" : ""} />
        </Button>
      </section>

      <section className="border-y border-border max-w-7xl  px-6 py-20 lg:px-8">
        <div className="mx-auto min-w-sm ">
          <div className="grid gap-6 lg:grid-cols-3">
            {valueCards.map((item) => (
              <article
                key={item.title}
                className="group relative overflow-hidden rounded-xl border border-border p-6 transition duration-200 hover:-translate-y-1"
              >
                <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-primary/40 blur-2xl" />
                <span className="inline-flex p-5 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <IconComp name={item.icon} className="h-10 w-10" />
                </span>
                <h3 className="mt-4 text-2xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-lg font-bold tracking-[.18em] text-primary uppercase">
            Customer stories
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
            Business owners who got clearer digital paths.
          </h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {HOME_TESTIMONIALS.map((testimonial) => (
            <article
              key={testimonial.name}
              className="group relative overflow-hidden rounded-xl border border-border bg-surface p-6 transition duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-primary/10 blur-2xl" />
              <div className="relative flex items-center gap-4">
                {testimonial.photo ? (
                  <Image
                    src={testimonial.photo}
                    alt={testimonial.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-lg font-semibold text-primary">
                    {getInitials(testimonial.name)}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {testimonial.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {testimonial.business}
                  </p>
                </div>
              </div>
              <div
                className="relative mt-5 flex gap-1 text-warning"
                aria-label={`${testimonial.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <span
                    key={`${testimonial.name}-star-${index}`}
                    aria-hidden="true"
                    className={
                      index < testimonial.rating ? "opacity-100" : "opacity-25"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="relative mt-4 text-sm leading-6 text-muted">
                {testimonial.quote}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto flex min-h-[40vh] max-w-7xl flex-col items-center justify-center border-t px-6 py-14 sm:py-20 lg:px-8">
        <div className="grid w-full gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-10">
          <div className="rounded-2xl py-2 sm:py-12">
            <p className="text-lg font-bold text-primary tracking-[.18em] uppercase">
              {cta.eyebrow}
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold">
              {cta.title}
            </h2>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                href={cta.primaryCta.href}
                variant="secondary"
                size="lg"
                radius="lg"
                className="border-border/40 text-primary hover:bg-surface/20"
              >
                {cta.primaryCta.label}
              </Button>
            </div>
          </div>
          <div className="mx-auto w-full max-w-sm lg:max-w-xs">
            <Image
              src="/img/next-task.svg"
              alt="A person planning their next business task"
              width={300}
              height={250}
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
