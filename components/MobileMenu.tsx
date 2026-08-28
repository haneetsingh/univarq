"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Mark } from "./Mark";
import { Button } from "./Button";
import content from "@/content/homepage.json";

const { site } = content;

type MobileMenuLink = { href: string; label: string };

type MobileMenuProps = {
  links: MobileMenuLink[];
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ links, open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const previouslyFocused = document.activeElement as HTMLElement | null;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      id="mobile-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-100 flex flex-col overflow-y-auto bg-ink px-5 pb-8 pt-5 sm:px-8"
    >
      <div className="flex items-center justify-between">
        <a
          href="#home"
          aria-label="Univarq home"
          className="flex items-center gap-2.5 text-paper"
          onClick={onClose}
        >
          <Mark size={29} />
          <span className="font-display text-[24px] font-semibold leading-none tracking-[-0.035em] text-paper">
            Univarq
          </span>
        </a>
        <Button
          variant="icon"
          onClick={onClose}
          icon={<span className="font-label text-[22px]">&times;</span>}
        >
          Close menu
        </Button>
      </div>

      <nav aria-label="Main" className="mt-4 flex flex-col">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            data-menu-link
            onClick={onClose}
            className="flex min-h-16 items-center border-b border-rule font-display text-[26px] font-medium tracking-[-0.025em] text-paper transition-colors hover:text-brass-hover"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-3.5 pt-8">
        <Button
          as="a"
          href="#contact"
          onClick={onClose}
          fullWidth
          className="min-h-14 text-sm"
        >
          {site.formCta}
        </Button>
        <p className="text-center font-label text-[11px] uppercase text-grey">
          Build &middot; Embed &middot; Modernize
        </p>
      </div>
    </div>,
    document.body
  );
}
