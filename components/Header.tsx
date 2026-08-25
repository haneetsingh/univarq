"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Mark } from "./Mark";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#solutions", label: "Solutions" },
  { href: "#case-studies", label: "Case Studies" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const CTA_LABEL = "Tell us what you're trying to build";

export function Header() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    sectionsRef.current = NAV_LINKS.map((link) =>
      document.getElementById(link.href.slice(1))
    ).filter((el): el is HTMLElement => el !== null);

    function recompute() {
      const sections = sectionsRef.current;
      if (sections.length === 0) return;

      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 4
      ) {
        setActiveId(sections[sections.length - 1].id);
        return;
      }

      const threshold = window.innerHeight * 0.35;
      let current: string | null = null;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= threshold) {
          current = section.id;
        }
      }
      setActiveId(current);
    }

    recompute();
    window.addEventListener("scroll", recompute, { passive: true });
    window.addEventListener("resize", recompute);
    return () => {
      window.removeEventListener("scroll", recompute);
      window.removeEventListener("resize", recompute);
    };
  }, []);

  return (
    <>
      <a
        href="#main"
        className="fixed left-[-9999px] top-3 z-100 bg-brass px-4 py-2 font-label text-[12px] text-ink focus:left-3"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-50 border-b border-rule bg-ink/92 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-3 px-6 py-4 sm:px-8">
          <Link
            href="#home"
            aria-label="Univarq home"
            className="flex items-center gap-2.5"
          >
            <Mark size={29} />
            <span
              className="font-display font-semibold text-paper"
              style={{ fontSize: 24, letterSpacing: "-0.035em", lineHeight: 1 }}
            >
              Univarq
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="ml-auto flex flex-wrap items-center justify-end gap-x-6 gap-y-3.5"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className="border-b pb-1.25 font-body text-sm transition-colors"
                  style={{
                    color: isActive ? "var(--color-paper)" : "var(--color-grey)",
                    borderBottomColor: isActive ? "var(--color-brass)" : "transparent",
                  }}
                >
                  {link.label}
                </a>
              );
            })}
            <a
              href="#contact"
              className="shrink-0 bg-brass px-4.5 py-3.5 font-body text-[13.5px] font-medium text-ink transition-colors hover:bg-brass-hover"
            >
              {CTA_LABEL}
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}
