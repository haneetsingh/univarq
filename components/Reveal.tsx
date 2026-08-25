"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      el.getBoundingClientRect().top <= window.innerHeight * 0.9
    ) {
      return;
    }

    setHidden(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHidden(false);
          observer.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);

    const fallback = setTimeout(() => setHidden(false), 6000);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

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
