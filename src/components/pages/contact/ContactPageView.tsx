"use client";

import { useState } from "react";
import { IconComp } from "@/components/widgets/IconComp";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CallRequestForm } from "@/components/pages/contact/CallRequestForm";
import { EnquiryForm } from "@/components/pages/contact/EnquiryForm";

export function ContactPageView() {
  useScrollReveal();
  const [activeForm, setActiveForm] = useState<"enquiry" | "call">("enquiry");

  return (
    <main className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div
          data-reveal
          className="relative overflow-hidden rounded-3xl border border-border bg-surface p-6"
        >
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative flex items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <IconComp name="contact" className="h-5 w-5" />
            </span>
            <p className="text-sm font-bold tracking-[.18em] text-primary uppercase">
              Contact us
            </p>
          </div>
          <h1 className="mt-4 text-4xl font-semibold text-foreground sm:text-5xl">
            Request a call and choose a convenient schedule.
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-8 text-muted">
            Tell us what you are building or choose a convenient time for a
            conversation.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <button
              type="button"
              onClick={() => setActiveForm("enquiry")}
              className={`rounded-2xl border p-4 text-left transition ${activeForm === "enquiry" ? "border-primary bg-primary/10" : "border-border hover:bg-surface-muted"}`}
            >
              <span className="block font-semibold text-foreground">
                Send Enquiry
              </span>
              <span className="mt-1 block text-sm text-muted">
                Share your project details and goals.
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveForm("call")}
              className={`rounded-2xl border p-4 text-left transition ${activeForm === "call" ? "border-primary bg-primary/10" : "border-border hover:bg-surface-muted"}`}
            >
              <span className="block font-semibold text-foreground">
                Request a Call
              </span>
              <span className="mt-1 block text-sm text-muted">
                Choose a preferred time of day.
              </span>
            </button>
          </div>
        </div>

        <div
          className="relative overflow-hidden rounded-3xl border border-border bg-surface p-6 backdrop-blur-xl"
          data-reveal
        >
          <div className="absolute -left-10 -top-10 h-28 w-28 rounded-full bg-primary/10 blur-3xl" />
          <p className="relative mb-6 text-sm font-bold tracking-[.18em] text-primary uppercase">
            {activeForm === "enquiry" ? "Project enquiry" : "Call request"}
          </p>
          <div className="relative">
            {activeForm === "enquiry" ? <EnquiryForm /> : <CallRequestForm />}
          </div>
        </div>
      </section>
    </main>
  );
}
