import Link from "next/link";
import type { LegalDocumentData } from "@/data/legal_documents_data";

interface LegalDocumentPageProps {
  document: LegalDocumentData;
  lastUpdated: string;
}

export function LegalDocumentPage({
  document,
  lastUpdated,
}: LegalDocumentPageProps) {
  return (
    <main className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-16 lg:px-8">
      <header className="max-w-4xl border-b border-border pb-8 sm:pb-10">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <Link href="/" className="hover:text-primary">
            DoomSphere
          </Link>
          <span aria-hidden="true"> / </span>
          <span className="text-foreground">{document.title}</span>
        </nav>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {document.title}
        </h1>
        <p className="mt-3 text-sm text-subtle">
          Last updated: {lastUpdated}
        </p>
        <p className="mt-6 text-base leading-7 text-muted sm:text-lg sm:leading-8">
          {document.introduction}
        </p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-14">
        <nav
          aria-label={`${document.title} sections`}
          className="h-fit rounded-2xl border border-border bg-surface p-4 lg:sticky lg:top-28"
        >
          <p className="text-xs font-bold tracking-[.14em] text-subtle uppercase">
            On this page
          </p>
          <ol className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
            {document.sections.map((section) => (
              <li key={section.id} className="shrink-0 lg:shrink">
                <a
                  href={`#${section.id}`}
                  className="inline-flex rounded-lg px-2 py-1.5 text-sm text-muted transition hover:bg-surface-muted hover:text-primary"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="min-w-0 max-w-3xl">
          {document.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-28 border-b border-border py-6 first:pt-0 last:border-b-0"
            >
              <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {section.title}
              </h2>
              <div className="mt-3 space-y-4 text-sm leading-7 text-muted sm:text-base">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
          <p className="mt-8 rounded-xl bg-surface-muted p-4 text-sm leading-6 text-muted">
            These documents describe DoomSphere&apos;s general practices and are
            not a substitute for advice from a qualified legal professional
            about your particular circumstances.
          </p>
        </article>
      </div>
    </main>
  );
}
