"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { brand } from "@/config/brand";
import { IconComp } from "@/components/widgets/icon-comp";
import {
  PAGE_NAVIGATION,
  SERVICE_CATEGORY_TABS,
  getServicesForCategory,
  type NavigationIcon,
} from "@/data/navigation_data";
import type { ServiceCategory } from "@/data/services_data";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/shared/Button";
import Image from "next/image";

type ServiceTab = (typeof SERVICE_CATEGORY_TABS)[number];

/** Site navigation with a click-open service directory and searchable route index. */
export function Header() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<ServiceTab>("All services");
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const headerRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const services = getServicesForCategory(activeTab);
  const searchResults = useMemo(() => getSearchResults(query), [query]);
  const mobilePageLinks = PAGE_NAVIGATION;

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (!headerRef.current?.contains(event.target as Node)) closeMenus();
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") closeMenus();
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus();
  }, [isSearchOpen]);

  function closeMenus() {
    setIsServicesOpen(false);
    setIsSearchOpen(false);
  }

  function toggleServices() {
    setIsServicesOpen((isOpen) => !isOpen);
    setIsSearchOpen(false);
  }

  function openSearch() {
    setIsSearchOpen(true);
    setIsServicesOpen(false);
  }

  return (
    <header
      ref={headerRef}
      className="sticky top-0 left-0 z-50 border-b border-border/80 shadow-sm bg-surface-muted"
    >
      {/* <OfferBanner /> */}
      <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <LOGO brandNameClass={"hidden sm:block"} />
        <nav
          className="flex items-center gap-1"
          aria-label="Primary navigation"
        >
          <Button
            type="button"
            variant="secondary"
            aria-expanded={isServicesOpen}
            aria-controls="services-directory"
            onClick={toggleServices}
          >
            Services{" "}
            <IconComp
              name="chevron"
              className={`h-4 w-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`}
            />
          </Button>
          {PAGE_NAVIGATION.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                className={` hidden rounded-full px-3 py-2 text-sm font-semibold transition-colors lg:inline-flex ${isActive ? "bg-primary text-primary-foreground" : "text-muted hover:bg-surface-muted hover:text-foreground"}`}
                href={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            className="h-10 sm:w-48"
            aria-expanded={isSearchOpen}
            aria-controls="site-search"
            onClick={openSearch}
          >
            <IconComp name="search" className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Search services</span>
            <span className="sm:hidden">Search</span>
          </Button>
          <ThemeToggle />
        </div>
      </div>
      {isServicesOpen && (
        <ServicesDirectory
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          onNavigate={closeMenus}
          services={services}
        />
      )}
      {isSearchOpen && (
        <SearchDirectory
          inputRef={searchInputRef}
          query={query}
          results={searchResults}
          onNavigate={closeMenus}
          onQueryChange={setQuery}
        />
      )}
      <div className="border-t border-border/60 bg-canvas/80 px-4 py-2 lg:hidden">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {mobilePageLinks.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${isActive ? "bg-primary text-primary-foreground" : "bg-surface-muted text-muted hover:bg-border hover:text-foreground"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}

function OfferBanner() {
  const offer = brand.offer;

  return (
    <div className="site-offer-bar">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-2 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex min-w-0 items-start gap-3 md:items-center">
          <span className="site-offer-icon">
            <IconComp name="spark" className="h-4 w-4" />
          </span>
          <p className="min-w-0 text-sm leading-5 text-foreground">
            <span className="font-bold text-primary">{offer.eyebrow}: </span>
            <span className="font-semibold">{offer.title}</span>
            <span className="hidden text-muted sm:inline">
              {" "}
              - {offer.description}
            </span>
          </p>
        </div>
        <a className="site-offer-link" download href={offer.ctaHref}>
          {offer.ctaLabel}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}

interface ServicesDirectoryProps {
  activeTab: ServiceTab;
  onNavigate: () => void;
  onSelectTab: (tab: ServiceTab) => void;
  services: ReturnType<typeof getServicesForCategory>;
}

function ServicesDirectory({
  activeTab,
  onNavigate,
  onSelectTab,
  services,
}: ServicesDirectoryProps) {
  return (
    <div
      id="services-directory"
      className="absolute inset-x-0 border-y z-100 border-border border-b bg-surface-muted shadow-lg"
    >
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold tracking-[.14em] text-primary uppercase">
              Service directory
            </p>
            <p className="mt-1 text-sm text-muted">
              Choose a solution for the work in front of you.
            </p>
          </div>
          <Button
            href="/#services"
            onClick={onNavigate}
            variant="ghost"
            size="sm"
            className="hidden border-transparent text-primary shadow-none hover:text-primary-hover sm:inline-flex"
          >
            View all on home <span aria-hidden="true">→</span>
          </Button>
        </div>
        <div
          className="mt-5 flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Service categories"
        >
          {SERVICE_CATEGORY_TABS.map((tab) => (
            <Button
              key={tab}
              type="button"
              variant={activeTab === tab ? "primary" : "secondary"}
              size="md"
              role="tab"
              aria-selected={activeTab === tab}
              className="shrink-0"
              onClick={() => onSelectTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 overflow-y-auto max-h-[55vh]">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/${service.slug}`}
              onClick={onNavigate}
              className="group rounded-xl border border-border bg-canvas p-4 transition hover:-translate-y-0.5 hover:border-primary hover:bg-surface"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <IconComp name={service.icon} className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-sm font-semibold text-foreground group-hover:text-primary">
                {service.name}
              </h2>
              <p className="mt-1 text-sm leading-5 text-muted">
                {service.summary}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

interface SearchDirectoryProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  onNavigate: () => void;
  onQueryChange: (query: string) => void;
  query: string;
  results: readonly SearchResult[];
}

function SearchDirectory({
  inputRef,
  onNavigate,
  onQueryChange,
  query,
  results,
}: SearchDirectoryProps) {
  return (
    <div
      id="site-search"
      className="mx-auto left-1/2 -translate-x-1/2 absolute max-w-3xl min-w-[320px] h-[80vh] overflow-hidden rounded-xl border-border border shadow-xl bg-surface-muted p-3 md:p-5"
    >
      {/* input  */}
      <div className="flex items-center rounded-xl border border-border bg-canvas px-3 py-1">
        <IconComp name="search" className="h-5 w-5 text-muted" />
        <input
          ref={inputRef}
          id="site-search-input"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          className="h-10 rounded-full w-[90%] bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-subtle ml-2"
          placeholder="Search pages and services"
          type="search"
        />
      </div>
      <p className="mt-3 px-1 text-xs font-bold tracking-[.14em] text-subtle uppercase">
        {query ? "Results" : "Popular destinations"}
      </p>
      {/* results */}
      <div className="overflow-y-auto h-[87%] mt-1">
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {results.map((result) => (
            <Link
              key={result.href}
              href={result.href}
              onClick={onNavigate}
              className="flex items-start gap-3 rounded-xl p-3 transition hover:bg-surface hover:shadow-md"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {result.type === "Service" ? (
                  <IconComp
                    name={
                      result.category === "Enquiry"
                        ? "calendar"
                        : result.category === "WhatsApp Services"
                          ? "message"
                          : result.category === "Websites"
                            ? "window"
                            : result.category === "Marketing & Growth"
                              ? "target"
                              : "spark"
                    }
                    className="h-5 w-5"
                  />
                ) : (
                  <IconComp name={result.icon} className="h-5 w-5" />
                )}
              </span>
              <span>
                <span className="block text-sm font-semibold text-foreground">
                  {result.label}
                </span>
                <span className="mt-0.5 block text-sm leading-5 text-muted">
                  {result.description}
                </span>
              </span>
            </Link>
          ))}
          {results.length === 0 && (
            <p className="px-3 py-6 text-sm text-muted">
              No matching pages or services found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

interface SearchResult {
  category: ServiceCategory;
  description: string;
  href: string;
  icon: NavigationIcon;
  label: string;
  type: "Page" | "Service";
}

function getSearchResults(query: string): readonly SearchResult[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const pages: SearchResult[] = PAGE_NAVIGATION.map((page) => ({
    ...page,
    category: "Enquiry",
    type: "Page",
  }));
  const services: SearchResult[] = getServicesForCategory("All services").map(
    (service) => ({
      href: `/${service.slug}`,
      label: service.name,
      description: service.summary,
      category: service.category,
      icon: "service",
      type: "Service",
    }),
  );
  return [...pages, ...services]
    .filter(
      (item) =>
        !normalizedQuery ||
        `${item.label} ${item.description}`
          .toLocaleLowerCase()
          .includes(normalizedQuery),
    )
    .sort((first, second) => first.label.localeCompare(second.label));
}

function ServiceIcon({ category }: { category: ServiceCategory }) {
  const iconName = {
    Enquiry: "calendar",
    "WhatsApp Services": "message",
    Websites: "window",
    Automations: "spark",
    "Marketing & Growth": "target",
  } as const;
  return <Icon name={iconName[category]} className="h-5 w-5" />;
}

function Icon({
  className,
  name,
}: {
  className?: string;
  name:
    | "about"
    | "calendar"
    | "chevron"
    | "contact"
    | "faq"
    | "home"
    | "message"
    | "palette"
    | "search"
    | "service"
    | "spark"
    | "target"
    | "window";
}) {
  const paths = {
    about: (
      <>
        <circle cx="12" cy="8" r="3" />
        <path d="M5 21c.8-4 3.1-6 7-6s6.2 2 7 6" />
      </>
    ),
    calendar: (
      <>
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M8 3v4M16 3v4M4 10h16" />
      </>
    ),
    chevron: <path d="m6 9 6 6 6-6" />,
    contact: (
      <>
        <path d="M21 15a4 4 0 0 1-4 4H9l-4 3v-7a4 4 0 0 1-2-3.5V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />
        <path d="M8 9h8M8 13h5" />
      </>
    ),
    faq: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.8 9a2.3 2.3 0 1 1 3.5 2c-.9.5-1.3 1-1.3 2M12 17h.01" />
      </>
    ),
    home: (
      <>
        <path d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" />
        <path d="M9 21v-6h6v6" />
      </>
    ),
    message: (
      <>
        <path d="M21 11.5a8.2 8.2 0 0 1-8.5 8A9.5 9.5 0 0 1 8.3 18L3 20l1.8-4.7A7.8 7.8 0 0 1 4 11.5a8.2 8.2 0 0 1 8.5-8A8.2 8.2 0 0 1 21 11.5Z" />
        <path d="M8 11h.01M12 11h.01M16 11h.01" />
      </>
    ),
    palette: (
      <>
        <path d="M12 3a9 9 0 1 0 0 18h1.5a1.5 1.5 0 0 0 0-3H12a2 2 0 0 1 0-4h2a7 7 0 0 0 7-7 4 4 0 0 0-4-4Z" />
        <path d="M7.5 10h.01M9 6.5h.01M15 6.5h.01" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="6" />
        <path d="m16 16 4 4" />
      </>
    ),
    service: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M8 12h8M12 8v8" />
      </>
    ),
    spark: (
      <path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6ZM19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7Z" />
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 4V2M20 12h2M12 20v2M4 12H2" />
      </>
    ),
    window: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
      </>
    ),
  }[name];
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      {paths}
    </svg>
  );
}

export const LOGO = ({
  brandNameClass,
  logoClass,
}: {
  brandNameClass?: string | null;
  logoClass?: string | null;
}) => {
  return (
    <div className="flex items-center gap-2">
      <Image
        alt="logo-image"
        width={35}
        height={35}
        className={`object-cover ${logoClass}`}
        src="/web-app-manifest-192x192.png"
      ></Image>
      <Link href="/" className={`text-xl font-semibold ${brandNameClass}`}>
        DoomSphere
      </Link>
    </div>
  );
};
