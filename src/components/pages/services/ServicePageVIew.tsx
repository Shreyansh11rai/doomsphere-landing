"use client";

import { useState } from "react";
import Link from "next/link";
import { brand } from "@/config/brand";
import { Button } from "@/components/shared/Button";
import { IconComp } from "@/components/widgets/IconComp";
import { SERVICES_DATA, type ServiceData } from "@/data/services_data";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { submitPricingInterest } from "@/services/enquiryService";

interface ServicePageViewProps {
  service: ServiceData;
}

/** Reusable service detail template driven by a single service JSON object. */
export function ServicePageView({ service }: ServicePageViewProps) {
  useScrollReveal();
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  async function handlePricingSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      company: String(form.get("company") ?? ""),
      contact: String(form.get("contact") ?? ""),
      requirement: String(form.get("requirement") ?? ""),
      serviceId: service.slug,
      source: "service-page-quote",
    };

    await submitPricingInterest(payload);
    setStatusMessage(
      "Thanks! Your quote request has been prepared for follow-up.",
    );
    setIsPricingOpen(false);
  }

  return (
    <main>
      <div className="md:hidden">
        <nav className="fixed inset-x-0 bottom-4 z-40 mx-auto flex w-[calc(100%-2rem)] max-w-3xl items-center gap-2 overflow-x-auto rounded-full border border-border bg-surface/90 px-2 py-2 shadow-lg backdrop-blur-xl">
          {SERVICES_DATA.map((item) => (
            <Link
              key={item.slug}
              href={`/${item.slug}`}
              className={`shrink-0 rounded-full px-3 py-2 text-sm font-semibold ${item.slug === service.slug ? "bg-primary text-primary-foreground" : "text-muted hover:bg-surface-muted hover:text-foreground"}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:py-24 lg:grid-cols-[16rem_minmax(0,1fr)_22rem] lg:px-8">
        <aside className="hidden md:block">
          <div className="sticky top-24 rounded-2xl border border-border bg-surface p-4 shadow-[0_18px_50px_-30px_rgb(var(--theme-shadow))]">
            <p className="text-sm font-bold tracking-[.14em] text-primary uppercase">
              Explore services
            </p>
            <div className="mt-4 space-y-2">
              {SERVICES_DATA.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${item.slug}`}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${item.slug === service.slug ? "bg-primary text-primary-foreground" : "text-muted hover:bg-surface-muted hover:text-foreground"}`}
                >
                  <IconComp name={item.icon} className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>

        <div
          data-reveal
          className="relative overflow-hidden rounded-3xl border border-border bg-surface p-4 sm:p-6"
        >
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative flex items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <IconComp name={service.icon} className="h-5 w-5" />
            </span>
            <p className="text-sm font-bold tracking-[.18em] text-primary uppercase">
              {service.eyebrow}
            </p>
          </div>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            {service.name}
          </h1>
          <p className="mt-4 text-lg font-medium text-foreground">
            {service.valueProposition}
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            {service.description}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button
              type="button"
              onClick={() => setIsPricingOpen(true)}
              size="lg"
              radius="lg"
            >
              Get a Quote
            </Button>
            <Button
              href={`tel:${brand.contactNumber}`}
              variant="secondary"
              size="lg"
              radius="lg"
            >
              Call us
            </Button>
          </div>
          {service.trustStats && service.trustStats.length > 0 && (
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {service.trustStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border bg-surface-muted p-4"
                >
                  <p className="text-xl font-semibold text-foreground">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <aside
          data-reveal
          className="rounded-2xl border border-border bg-surface p-6 shadow-[0_18px_50px_-30px_rgb(var(--theme-shadow))]"
        >
          <p className="text-sm font-semibold text-primary">Get a Quote</p>
          <p className="mt-2 text-3xl font-semibold text-foreground">
            Scope first, quote next.
          </p>
          <p className="mt-3 text-sm leading-6 text-muted">
            {service.stat}. We will recommend the scope that best fits your next
            goal.
          </p>
          <div className="mt-5 rounded-xl bg-surface-muted p-4 text-sm leading-6 text-muted">
            <p className="font-semibold text-foreground">Best for</p>
            <p className="mt-2">{service.idealFor[0]}</p>
          </div>
        </aside>
      </section>

      {service.problems && service.problems.length > 0 && (
        <section className="border-y border-border bg-surface-muted">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <IconComp name="target" className="h-5 w-5" />
              </span>
              <p className="text-sm font-bold tracking-[.18em] text-primary uppercase">
                What we solve
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {service.problems.map((problem, index) => (
                <article
                  key={problem.title}
                  className="rounded-xl border border-border bg-surface p-6"
                >
                  <p className="text-sm font-semibold text-primary">
                    0{index + 1}
                  </p>
                  <h2 className="mt-4 text-lg font-semibold text-foreground">
                    {problem.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    {problem.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {service.process && service.process.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <IconComp name="compass" className="h-5 w-5" />
            </span>
            <p className="text-sm font-bold tracking-[.18em] text-primary uppercase">
              How it works
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {service.process.map((step, index) => (
              <article
                key={step.title}
                className="rounded-xl border border-border bg-surface p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-6 text-muted">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      {service.features && service.features.length > 0 && (
        <section className="border-y border-border bg-surface-muted">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <IconComp name="book" className="h-5 w-5" />
              </span>
              <p className="text-sm font-bold tracking-[.18em] text-primary uppercase">
                What is included
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {service.features.map((feature, index) => (
                <article
                  key={feature}
                  className="rounded-xl border border-border bg-surface p-6"
                >
                  <p className="text-sm font-semibold text-primary">
                    0{index + 1}
                  </p>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {feature}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Concrete deliverable included in the recommended scope.
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {service.differentiators && service.differentiators.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <article className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6">
              <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-primary/10 blur-2xl" />
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <IconComp name="shield" className="h-5 w-5" />
                </span>
                <p className="text-sm font-bold tracking-[.14em] text-primary uppercase">
                  Why choose us
                </p>
              </div>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-muted">
                {service.differentiators.map((point) => (
                  <li
                    key={point.title}
                    className="rounded-xl bg-surface-muted p-4"
                  >
                    <span className="block font-semibold text-foreground">
                      {point.title}
                    </span>
                    <span className="mt-1 block">{point.description}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6">
              <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-primary/10 blur-2xl" />
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <IconComp name="compass" className="h-5 w-5" />
                </span>
                <p className="text-sm font-bold tracking-[.14em] text-primary uppercase">
                  Delivery clarity
                </p>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {service.timeAndMoneyBenefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="rounded-xl bg-surface-muted p-4"
                  >
                    <p className="text-sm font-semibold text-primary">
                      {benefit.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {benefit.detail}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>
      )}

      {/* TODO: Restore the pricing ladder section when public pricing is ready. */}

      {service.testimonials && service.testimonials.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <IconComp name="chat" className="h-5 w-5" />
            </span>
            <p className="text-sm font-bold tracking-[.18em] text-primary uppercase">
              Social proof
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {service.testimonials.map((item) => (
              <article
                key={item.name}
                className="rounded-xl border border-border bg-surface p-6"
              >
                <p className="text-xs font-semibold tracking-[.14em] text-subtle uppercase">
                  {item.placeholder ? "Placeholder" : "Client"}
                </p>
                {item.rating && (
                  <p className="mt-3 text-sm font-semibold text-warning">
                    {item.rating}/5 stars
                  </p>
                )}
                <h3 className="mt-3 text-lg font-semibold text-foreground">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {item.outcome}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      {service.faqs && service.faqs.length > 0 && (
        <section className="border-y border-border bg-surface-muted">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <IconComp name="faq" className="h-5 w-5" />
              </span>
              <p className="text-sm font-bold tracking-[.18em] text-primary uppercase">
                FAQ
              </p>
            </div>
            <div className="mt-8 space-y-3">
              {service.faqs.map((item) => (
                <details
                  key={item.question}
                  className="ui-modal rounded-2xl p-4"
                >
                  <summary className="cursor-pointer list-none text-sm font-semibold text-foreground">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <section data-reveal className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="rounded-2xl bg-surface px-7 py-12 text-foreground sm:px-12">
          <p className="text-sm font-bold tracking-[.18em] text-primary uppercase">
            Need help deciding?
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold">
            Not sure which plan fits your next move? Talk to us and we will
            guide the cleanest path.
          </h2>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button
              type="button"
              onClick={() => setIsPricingOpen(true)}
              size="lg"
              radius="lg"
            >
              Get a Quote
            </Button>
            <Button
              href={`tel:${brand.contactNumber}`}
              variant="secondary"
              size="lg"
              radius="lg"
            >
              Call us
            </Button>
          </div>
        </div>
      </section>

      {statusMessage && (
        <p className="mx-auto mt-4 max-w-7xl px-6 text-sm font-semibold text-success lg:px-8">
          {statusMessage}
        </p>
      )}

      {isPricingOpen && (
        <div className="fixed inset-0 z-80 flex items-center justify-center bg-surface/30 px-4 backdrop-blur-sm">
          <div className="ui-modal w-full max-w-md rounded-3xl p-6 bg-surface">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-primary">
                  {service.eyebrow}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-foreground">
                  {service.name}
                </h3>
              </div>
              <Button
                type="button"
                onClick={() => setIsPricingOpen(false)}
                variant="ghost"
                size="sm"
              >
                Close
              </Button>
            </div>

            <form onSubmit={handlePricingSubmit} className="mt-6 space-y-4">
              <label className="block text-sm text-muted">
                <span className="mb-2 block font-semibold text-foreground">
                  Name
                </span>
                <input name="name" required className="ui-input" />
              </label>
              <label className="block text-sm text-muted">
                <span className="mb-2 block font-semibold text-foreground">
                  Company
                </span>
                <input name="company" required className="ui-input" />
              </label>
              <label className="block text-sm text-muted">
                <span className="mb-2 block font-semibold text-foreground">
                  Contact
                </span>
                <input name="contact" required className="ui-input" />
              </label>
              <label className="block text-sm text-muted">
                <span className="mb-2 block font-semibold text-foreground">
                  Requirement
                </span>
                <input name="requirement" className="ui-input" />
              </label>
              <Button type="submit" size="lg" radius="xl" className="w-full">
                Get quote
              </Button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
