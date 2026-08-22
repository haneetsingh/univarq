import Link from "next/link";
import { Mark } from "./Mark";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#approach", label: "Approach" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
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
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="label text-grey transition-colors hover:text-paper"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="label border border-rule-strong px-4 py-2 text-paper transition-colors hover:border-brass hover:text-brass"
        >
          Start a conversation
        </a>
      </div>
    </header>
  );
}
