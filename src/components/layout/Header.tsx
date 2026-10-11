"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import { Button } from "@/components/shared/Button";
import { IconComp } from "@/components/layout/widgets/IconComp";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { brand } from "@/config/brand.config";
import {
  getServiceCategoryHref,
  PAGE_NAVIGATION,
  getServicesForCategory,
} from "@/data/navigation_data";
import type { IconName } from "@/data/icons_data";
import { SERVICE_CATEGORIES, type ServiceCategory } from "@/data/services_data";

const categoryIcons: Readonly<Record<ServiceCategory, IconName>> = {
  Enquiry: "calendar",
  "WhatsApp Services": "message",
  Websites: "window",
  Automations: "spark",
  "Marketing & Growth": "target",
};

interface SearchResult {
  description: string;
  href: string;
  icon: IconName;
  label: string;
}

/** Site navigation with service categories directly available in the header. */
export function Header() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const headerRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchResults = useMemo(() => getSearchResults(query), [query]);

  useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus();
  }, [isSearchOpen]);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsSearchOpen(false);
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  const categoryLinks = SERVICE_CATEGORIES.map((category) => {
    const href = getServiceCategoryHref(category);
    const isActive = pathname === href;
    return (
      <Link
        key={category}
        href={href}
        className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors ${isActive ? "bg-primary text-primary-foreground" : "text-muted hover:bg-surface hover:text-foreground"}`}
      >
        <IconComp name={categoryIcons[category]} className="h-4 w-4" />
        {category}
      </Link>
    );
  });

  return (
    <header
      ref={headerRef}
      className="sticky top-0 left-0 z-50 border-b border-border/80 bg-surface-muted shadow-sm"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-2 sm:px-6 lg:px-8">
        <LOGO />
        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-1 overflow-x-auto lg:flex"
          aria-label="Service categories"
        >
          {categoryLinks}
        </nav>
        <nav
          className="hidden items-center gap-1 xl:flex"
          aria-label="Site navigation"
        >
          {PAGE_NAVIGATION.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3 py-2 text-sm font-semibold transition-colors ${pathname === item.href ? "bg-primary text-primary-foreground" : "text-muted hover:bg-surface hover:text-foreground"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {/* <span className="hidden items-center gap-2 2xl:flex">
          <Image
            alt="Ashoka emblem"
            className="rounded-full"
            height={36}
            width={36}
            src="/ashok-stambh.jpeg"
          />
          <span className="text-sm font-bold tracking-tight text-foreground">
            URN: UDYAM-UP-75-0207973
          </span>
        </span> */}
        <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-0">
          <Button
            type="button"
            variant="secondary"
            className="h-10"
            aria-expanded={isSearchOpen}
            aria-controls="site-search"
            onClick={() => setIsSearchOpen((open) => !open)}
          >
            <IconComp name="search" className="h-4 w-4 shrink-0" />
            {/* <span className="hidden sm:inline">Search services</span> */}
            {/* <span className="sm:hidden">Search</span> */}
          </Button>
          <ThemeToggle />
        </div>
      </div>

      <nav
        className="flex items-center gap-1 overflow-x-auto border-t border-border/60 bg-canvas/80 px-3 py-2 lg:hidden"
        aria-label="Service categories"
      >
        {categoryLinks}
        {PAGE_NAVIGATION.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="inline-flex shrink-0 rounded-full px-3 py-2 text-sm font-semibold text-muted transition-colors hover:bg-surface hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {isSearchOpen && (
        <div
          id="site-search"
          className="absolute inset-x-3 top-full z-50 mx-auto max-w-3xl rounded-2xl border border-border bg-surface-muted p-4 shadow-xl sm:inset-x-6 sm:p-5"
        >
          <div className="flex items-center rounded-xl border border-border bg-canvas px-3">
            <IconComp name="search" className="h-5 w-5 text-muted" />
            <input
              ref={searchInputRef}
              id="site-search-input"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-11 w-full bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-subtle"
              placeholder="Search pages and services"
              type="search"
            />
          </div>
          <div className="mt-3 max-h-[60vh] overflow-y-auto">
            <div className="grid gap-2 sm:grid-cols-2">
              {searchResults.map((result) => (
                <Link
                  key={result.href}
                  href={result.href}
                  onClick={() => setIsSearchOpen(false)}
                  className="group flex items-start gap-3 rounded-xl p-3 transition hover:bg-surface"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <IconComp name={result.icon} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-foreground">
                      {result.label}
                    </span>
                    <span className="mt-0.5 block text-sm leading-5 text-muted">
                      {result.description}
                    </span>
                  </span>
                  <BsArrowUpRight
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-primary opacity-0 transition group-hover:opacity-100"
                  />
                </Link>
              ))}
              {searchResults.length === 0 && (
                <p className="px-3 py-6 text-sm text-muted">
                  No matching pages or services found.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function getSearchResults(query: string): readonly SearchResult[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const pages: SearchResult[] = PAGE_NAVIGATION.map((page) => ({
    href: page.href,
    label: page.label,
    description: page.description,
    icon: page.icon,
  }));
  const services: SearchResult[] = getServicesForCategory("All services").map(
    (service) => ({
      href: `/${service.slug}`,
      label: service.name,
      description: service.summary,
      icon: service.icon,
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

export const LOGO = () => (
  <Link
    className="flex shrink-0 items-center gap-2"
    href="/"
    aria-label={`${brand.shortName} home`}
  >
    <Image
      alt={`${brand.shortName} logo`}
      width={38}
      height={38}
      className="object-cover"
      src="/web-app-manifest-192x192.png"
    />
    <span className="hidden text-base font-semibold text-foreground sm:inline">
      DoomSphere
    </span>
  </Link>
);
