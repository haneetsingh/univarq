"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Mark } from "./Mark";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#why", label: "Why Univarq" },
  { href: "#services", label: "What We Do" },
];

const NAV_IDS = new Set(NAV_LINKS.map((link) => link.href.slice(1)));

export function Header() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [inContact, setInContact] = useState(false);

  useEffect(() => {
    // Include #contact so leaving the last nav section clears the highlight.
    const allSectionIds = [...NAV_IDS, "contact"];
    const sections = allSectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    // Track intersection state persistently — a click-triggered jump can
    // land inside a section without it ever appearing in a callback batch.
    const intersecting = new Map<string, DOMRectReadOnly>();

    function recomputeActive() {
      const topSection = [...intersecting.entries()].sort(
        (a, b) => a[1].top - b[1].top
      )[0]?.[0];
      setInContact(topSection === "contact");
      setActiveId(topSection && NAV_IDS.has(topSection) ? topSection : null);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            intersecting.set(entry.target.id, entry.boundingClientRect);
          } else {
            intersecting.delete(entry.target.id);
          }
        }
        recomputeActive();
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
        <Link
          href="#top"
          className="flex items-center gap-3 rounded-sm"
          style={{ gap: "0.37em" }}
        >
          <Mark size={32} />
          <span
            className="font-display font-semibold"
            style={{ fontSize: 22, letterSpacing: "-0.035em", lineHeight: 1 }}
          >
            Univarq
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-10 sm:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className="label"
                style={{
                  color: isActive ? "var(--color-brass)" : "var(--color-grey)",
                  transition: "color 150ms ease",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = "var(--color-paper)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = "var(--color-grey)";
                }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <a
          href="#contact"
          aria-current={inContact ? "true" : undefined}
          className="label border px-4 py-2 transition-colors"
          style={{
            borderColor: inContact ? "var(--color-brass)" : "var(--color-rule-strong)",
            background: inContact ? "var(--color-slate)" : "transparent",
            color: inContact ? "var(--color-brass)" : "var(--color-paper)",
          }}
          onMouseEnter={(e) => {
            if (!inContact) {
              e.currentTarget.style.borderColor = "var(--color-brass)";
              e.currentTarget.style.color = "var(--color-brass)";
            }
          }}
          onMouseLeave={(e) => {
            if (!inContact) {
              e.currentTarget.style.borderColor = "var(--color-rule-strong)";
              e.currentTarget.style.color = "var(--color-paper)";
            }
          }}
        >
          Start a conversation
        </a>
      </div>
    </header>
  );
}
