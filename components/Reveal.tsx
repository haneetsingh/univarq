"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import posthog from "posthog-js";

export function Reveal({
  children,
  sectionName,
}: {
  children: ReactNode;
  sectionName: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const viewObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          posthog.capture("section_viewed", { section: sectionName });
          viewObserver.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    viewObserver.observe(el);

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      el.getBoundingClientRect().top <= window.innerHeight * 0.9
    ) {
      return () => viewObserver.disconnect();
    }

    setHidden(true);

    const revealObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHidden(false);
          revealObserver.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    revealObserver.observe(el);

    const fallback = setTimeout(() => setHidden(false), 6000);

    return () => {
      viewObserver.disconnect();
      revealObserver.disconnect();
      clearTimeout(fallback);
    };
  }, [sectionName]);

  return (
    <div
      ref={ref}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? "translateY(18px)" : "translateY(0)",
        transition: "opacity .55s ease, transform .55s ease",
      }}
    >
      {children}
    </div>
  );
}
