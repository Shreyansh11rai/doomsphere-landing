import Link from "next/link";
import { brand } from "@/config/brand.config";
import { PAGE_NAVIGATION } from "@/data/navigation_data";
import { BiCalendar, BiLinkExternal } from "react-icons/bi";
import { IoCallOutline } from "react-icons/io5";
import { LOGO } from "./Header";
import { FaServicestack } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";

export function Footer() {
  const footerPageLinks = PAGE_NAVIGATION;

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* brand and CTAs  */}
        <div className="border-b border-border pb-7">
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-base font-bold tracking-tight text-primary-foreground shadow-sm"
            >
              <LOGO brandNameClass={"hidden"} />
            </span>
            <div>
              <p className="text-base font-bold tracking-tight text-foreground">
                DoomSphere
              </p>
              <p className="mt-0.5 text-sm text-muted">
                Digital solutions with measurable momentum.
              </p>
            </div>
          </div>
          <div className="*:w-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-5">
            {/* email  */}
            <a
              className="group inline-flex min-w-min items-center gap-3 rounded-xl border border-border bg-canvas px-4 py-3 text-left transition-colors hover:border-primary hover:bg-surface-muted"
              href={`mailto:${brand.contactEmail}`}
              aria-label={`Email ${brand.name} at ${brand.contactEmail}`}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <EmailIcon />
              </span>
              <span>
                <span className="block text-xs font-semibold tracking-[0.12em] text-subtle uppercase">
                  Start a conversation
                </span>
                <span className="mt-0.5 text-sm font-semibold text-foreground group-hover:text-primary">
                  {brand.contactEmail}
                </span>
              </span>
            </a>
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
            <a
              className="group inline-flex min-w-min w-fit items-center gap-3 rounded-xl border border-border bg-canvas px-4 py-3 text-left transition-colors hover:border-primary hover:bg-surface-muted"
              href={`#services`}
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
            </a>
          </div>
        </div>
        {/* pages and links  */}
        <div className="mt-8 grid gap-8 text-sm text-muted md:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm font-semibold tracking-[0.16em] text-subtle uppercase">
              Pages
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {footerPageLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.16em] text-subtle uppercase">
              Legal
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="transition-colors hover:text-foreground"
                >
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="transition-colors hover:text-foreground"
                >
                  Terms of service
                </Link>
              </li>
            </ul>
          </div>
        </div>
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
