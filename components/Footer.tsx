import { Mark } from "./Mark";

const SERVICES = [
  "Software Engineering",
  "Cloud & Platform",
  "Data & AI",
  "System Integration",
  "Modernization",
  "Engineering Teams",
];

const COMPANY_LINKS = [
  { href: "#about", label: "About" },
  { href: "#case-studies", label: "Case Studies" },
  { href: "#solutions", label: "Solutions" },
  { href: "#contact", label: "Contact" },
];

const CTA_LABEL = "Tell us what you're trying to build";

export function Footer() {
  return (
    <footer className="border-t border-rule bg-slate px-6 py-11 sm:px-8 sm:py-17">
      <div className="mx-auto flex max-w-6xl flex-wrap gap-9 sm:gap-18">
        <div className="flex flex-1 flex-col gap-5" style={{ flexBasis: 300, maxWidth: 520 }}>
          <div className="flex items-center gap-2.5">
            <Mark size={27} />
            <span
              className="font-display font-semibold text-paper"
              style={{ fontSize: 22, letterSpacing: "-0.035em", lineHeight: 1 }}
            >
              Univarq
            </span>
          </div>
          <p className="font-display text-paper" style={{ fontSize: 19 }}>
            Engineering the systems businesses depend on.
          </p>
          <a
            href="#contact"
            className="w-fit border-b text-brass transition-colors hover:text-brass-hover"
            style={{ borderBottomColor: "rgba(192,138,62,.45)" }}
          >
            {CTA_LABEL} &rarr;
          </a>
        </div>

        <div
          className="grid flex-1 gap-9"
          style={{ flexBasis: 400, gridTemplateColumns: "repeat(auto-fit, minmax(118px, 1fr))" }}
        >
          <div>
            <p className="label mb-4 text-grey">Services</p>
            <ul className="flex flex-col gap-2.5">
              {SERVICES.map((item) => (
                <li key={item} className="text-body" style={{ fontSize: 15, fontWeight: 300 }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label mb-4 text-grey">Company</p>
            <ul className="flex flex-col gap-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-body transition-colors hover:text-paper"
                    style={{ fontSize: 15, fontWeight: 300 }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label mb-4 text-grey">Connect</p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href="https://linkedin.com/company/univarq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body transition-colors hover:text-paper"
                  style={{ fontSize: 15, fontWeight: 300 }}
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@univarq.io"
                  className="text-body transition-colors hover:text-paper"
                  style={{ fontSize: 15, fontWeight: 300 }}
                >
                  info@univarq.io
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-11 flex max-w-6xl flex-wrap justify-between gap-3 border-t border-rule pt-6.5">
        <p className="font-label" style={{ fontSize: "11.5px", letterSpacing: "0.1em", color: "var(--color-faint)" }}>
          &copy; {new Date().getFullYear()} Univarq Technologies
        </p>
        <p className="font-label" style={{ fontSize: "11.5px", letterSpacing: "0.1em", color: "var(--color-faint)" }}>
          Build &middot; Embed &middot; Modernize
        </p>
      </div>
    </footer>
  );
}
