"use client";

import { brand } from "@/config/brand";
import { Button } from "@/components/shared/Button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { submitPricingInterest } from "@/services/enquiryService";
import { useState } from "react";

export function PricingPageView() {
  useScrollReveal();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      company: String(form.get("company") ?? ""),
      contact: String(form.get("contact") ?? ""),
      serviceId: "general-quote",
      source: "quote-page",
    };

    await submitPricingInterest(payload);
    setMessage("Thanks! Your quote request has been prepared for follow-up.");
    setIsOpen(false);
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <section className="mx-auto max-w-4xl text-center" data-reveal>
        <p className="text-sm font-bold tracking-[.18em] text-primary uppercase">
          Quote
        </p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Tell us what you need and we will scope it clearly.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted">
          Share your requirement or call us directly and we will recommend the
          right scope.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button type="button" onClick={() => setIsOpen(true)} size="lg">
            Get a Quote
          </Button>
          <Button
            href={`tel:${brand.contactNumber}`}
            variant="secondary"
            size="lg"
          >
            Call us
          </Button>
        </div>
        {/* TODO: Restore pricing packages and comparison sections when final pricing strategy is ready. */}
      </section>

      {isOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm">
          <div className="ui-modal w-full max-w-md rounded-3xl p-6 backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-primary">Quote</p>
                <h3 className="mt-2 text-xl font-semibold text-foreground">
                  Request a project quote
                </h3>
              </div>
              <Button
                type="button"
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
              >
                Close
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label className="block text-sm text-muted">
                <span className="mb-2 block font-semibold text-foreground">
                  Name
                </span>
                <input
                  name="name"
                  required
                  className="w-full rounded-xl border border-border bg-surface px-3 py-2 outline-none"
                />
              </label>
              <label className="block text-sm text-muted">
                <span className="mb-2 block font-semibold text-foreground">
                  Company
                </span>
                <input
                  name="company"
                  required
                  className="w-full rounded-xl border border-border bg-surface px-3 py-2 outline-none"
                />
              </label>
              <label className="block text-sm text-muted">
                <span className="mb-2 block font-semibold text-foreground">
                  Contact
                </span>
                <input
                  name="contact"
                  required
                  className="w-full rounded-xl border border-border bg-surface px-3 py-2 outline-none"
                />
              </label>
              <Button type="submit" size="lg" radius="xl" className="w-full">
                Get quote
              </Button>
            </form>
          </div>
        </div>
      )}

      {message && (
        <p className="mt-8 text-sm font-semibold text-success">{message}</p>
      )}
    </main>
  );
}
