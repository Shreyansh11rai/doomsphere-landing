"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Adds lightweight, scroll-triggered motion to page sections and their icons. */
export function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    async function animatePage() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        gsap
          .utils
          .toArray<HTMLElement>("main > section, main [data-reveal]")
          .forEach((section) => {
            gsap.fromTo(
              section,
              { autoAlpha: 0, y: 28 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 88%",
                  once: true,
                },
              },
            );
          });

        gsap.utils.toArray<SVGElement>("main svg").forEach((icon) => {
          gsap.fromTo(
            icon,
            { autoAlpha: 0, scale: 0.78, rotate: -8 },
            {
              autoAlpha: 1,
              scale: 1,
              rotate: 0,
              duration: 0.55,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: icon,
                start: "top 92%",
                once: true,
              },
            },
          );
        });
      });

      revert = () => context.revert();
      ScrollTrigger.refresh();
    }

    void animatePage();
    return () => {
      cancelled = true;
      revert?.();
    };
  }, [pathname]);

  return null;
}
