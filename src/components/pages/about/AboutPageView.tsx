import Image from "next/image";
import { IconComp } from "@/components/layout/widgets/IconComp";
import { Button } from "@/components/shared/Button";
import { ABOUT_PAGE_DATA } from "@/data/about_page_data";
import { brand } from "@/config/brand.config";

export function AboutPageView() {
  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.72fr)] lg:items-center lg:px-8">
        <div>
          <p className="text-sm font-bold tracking-[.18em] text-primary uppercase">
            About DoomSphere
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Digital work should make business feel more human.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            We help new and growing businesses show up clearly, support their
            customers, and spend less time on repetitive work.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact-us" size="lg" radius="lg">
              Start a conversation
            </Button>
            <Button
              href="/#services"
              variant="secondary"
              size="lg"
              radius="lg"
            >
              Explore services
            </Button>
          </div>
        </div>

        <div className="relative mx-auto flex min-h-64 w-full max-w-sm items-center justify-center overflow-hidden rounded-3xl border border-border bg-surface p-6 sm:min-h-80">
          <div
            aria-hidden="true"
            className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
          />
          {ABOUT_PAGE_DATA.founderImage ? (
            <Image
              src={ABOUT_PAGE_DATA.founderImage}
              alt={ABOUT_PAGE_DATA.founderImageAlt}
              width={360}
              height={420}
              priority
              className="relative h-full max-h-72 w-full rounded-2xl object-cover"
            />
          ) : (
            <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-primary/20 bg-canvas text-5xl font-semibold tracking-tight text-primary sm:h-52 sm:w-52 sm:text-6xl">
              DS
            </div>
          )}
          <p className="absolute bottom-5 left-5 right-5 text-center text-sm font-medium text-muted">
            A small team, focused on work that helps.
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-surface-muted">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <IconComp name="about" className="h-10 w-10" />
              </span>
              <p className="text-sm font-bold tracking-[.16em] text-primary uppercase">
                The story
              </p>
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
              Built from experience, shaped around your needs.
            </h2>
          </div>
          <div className="space-y-4 text-base leading-7 text-muted">
            {ABOUT_PAGE_DATA.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
        <p className="text-sm font-bold tracking-[.18em] text-primary uppercase">
          How we work
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-foreground">
          Useful progress, built together.
        </h2>
        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ABOUT_PAGE_DATA.values.map((value, index) => (
            <article
              key={value.title}
              className="rounded-2xl border border-border bg-surface p-5 sm:p-6"
            >
              <span className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 p-4 text-primary">
                <IconComp
                  name={index === 0 ? "chat" : index === 1 ? "spark" : "check"}
                  className="h-10 w-10"
                />
              </span>
              <h3 className="mt-4 text-xl font-semibold text-foreground">
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {value.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface-muted">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-12 sm:px-6 sm:py-16 md:grid-cols-[minmax(0,1fr)_auto] md:items-center lg:px-8">
          <div>
            <p className="text-sm font-bold tracking-[.18em] text-primary uppercase">
              Based in Varanasi
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
              Here to help your business move forward.
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              {brand.address}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
