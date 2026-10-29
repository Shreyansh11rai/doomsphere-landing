import Link from "next/link";
import { brand } from "@/config/brand.config";
import {
  getServiceCategoryHref,
  getServicesForCategory,
} from "@/data/navigation_data";
import { SERVICE_CATEGORIES } from "@/data/services_data";
import { BiCalendar, BiLinkExternal } from "react-icons/bi";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { LOGO } from "./Header";
import { FaServicestack } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* brand and CTAs  */}
        <div className="border-b border-border pb-7">
          <div className="flex items-center gap-4">
            <span aria-hidden="true" className="">
              <LOGO />
            </span>
            <div className="flex items-center gap-2">
              <Image
                alt="ashok stambh"
                className="rounded-full"
                height={40}
                width={40}
                src={"/ashok-stambh.jpeg"}
              />{" "}
              URN:
              <span className=" text-base text-primary flex items-center gap-2 font-bold tracking-tight text-foreground">
                UDYAM-UP-75-0207973
              </span>
            </div>
          </div>
          <div className="*:w-full mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* email  */}
            <span className="group inline-flex min-w-min items-center gap-3 rounded-xl border border-border bg-canvas px-4 py-3 text-left transition-colors hover:border-primary hover:bg-surface-muted">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <EmailIcon />
              </span>
              <span className="flex flex-col">
                {/* <span className="block text-xs font-semibold tracking-[0.12em] text-subtle uppercase">
                  Conversation or support
                </span> */}
                <a
                  href={`mailto:${brand.contactEmail}`}
                  className="mt-0.5 text-sm font-semibold text-foreground hover:text-primary"
                >
                  {brand.contactEmail}
                </a>
                <a
                  href={`mailto:${brand.supportEmail}`}
                  className="mt-1.0 text-sm font-semibold text-foreground hover:text-primary"
                >
                  {brand.supportEmail}
                </a>
              </span>
            </span>
            {/* call  */}
            <a
              className="group min-w-min inline-flex w-fit items-center gap-3 rounded-xl border border-border bg-canvas px-4 py-3 text-left transition-colors hover:border-primary hover:bg-surface-muted"
              href={`tel:${brand.contactNumber}`}
              aria-label={`Call us ${brand.contactNumber}`}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <IoCallOutline />
              </span>
              <span>
                <span className="block text-xs font-semibold tracking-[0.12em] text-subtle uppercase">
                  Call us
                </span>
                <span className="mt-0.5 block text-sm font-semibold text-foreground group-hover:text-primary">
                  {brand.contactNumber}
                </span>
              </span>
            </a>
            <div
              className="inline-flex min-w-min w-fit items-center gap-3 rounded-xl border border-border bg-canvas px-4 py-3 text-left"
              aria-label={`DoomSphere address: ${brand.address}`}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <IoLocationOutline />
              </span>
              <span>
                <span className="block text-xs font-semibold tracking-[0.12em] text-subtle uppercase">
                  Visit us
                </span>
                <span className="mt-0.5 block text-sm font-semibold text-foreground group-hover:text-primary">
                  {brand.address}
                </span>
              </span>
            </div>
            {/* appointment  */}
            <a
              className="group inline-flex min-w-min w-fit items-center gap-3 rounded-xl border border-border bg-canvas px-4 py-3 text-left transition-colors hover:border-primary hover:bg-surface-muted"
              href={`/contact-us`}
              aria-label={`Request a call`}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BiCalendar />
              </span>
              <span>
                <span className="block text-xs font-semibold tracking-[0.12em] text-subtle uppercase">
                  Schedule a callback
                </span>
                <span className="mt-0.5 flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-primary">
                  <BiLinkExternal />
                  Fill in details
                </span>
              </span>
            </a>
            {/* services  */}
            <Link
              className="group inline-flex min-w-min w-fit items-center gap-3 rounded-xl border border-border bg-canvas px-4 py-3 text-left transition-colors hover:border-primary hover:bg-surface-muted"
              href="/#services"
              aria-label={`Go to services`}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FaServicestack />
              </span>
              <span>
                <span className="block text-xs font-semibold tracking-[0.12em] text-subtle uppercase">
                  Go to services
                </span>
                <span className="mt-0.5 flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-primary">
                  <BsArrowRight className="-rotate-45" />
                </span>
              </span>
            </Link>
          </div>
        </div>
        {/* pages and links  */}
        <nav
          aria-label="Footer navigation"
          className="mt-8 grid grid-cols-2 gap-x-5 gap-y-8 text-sm text-muted sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
        >
          {SERVICE_CATEGORIES.map((category) => (
            <div key={category} className="min-w-0">
              <Link
                href={getServiceCategoryHref(category)}
                className="text-sm font-semibold tracking-[0.08em] text-subtle uppercase transition-colors hover:text-primary"
              >
                {category}
              </Link>
              <ul className="mt-3 flex flex-col gap-2">
                {getServicesForCategory(category).map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/${service.slug}`}
                      className="transition-colors hover:text-foreground"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="min-w-0">
            <p className="text-sm font-semibold tracking-[0.08em] text-subtle uppercase">
              All pages
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About us" },
                { href: "/contact-us", label: "Contact us" },
                { href: "/faq", label: "FAQ" },
                { href: "/pricing", label: "Pricing" },
                { href: "/privacy-policy", label: "Privacy policy" },
                { href: "/terms-of-service", label: "Terms of service" },
              ].map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function EmailIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}
