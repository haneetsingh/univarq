import { Mark } from "./Mark";
import content from "@/content/homepage.json";

const { footer, site } = content;

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
            {footer.tagline}
          </p>
          <a
            href="#contact"
            className="w-fit border-b text-brass transition-colors hover:text-brass-hover"
            style={{ borderBottomColor: "rgba(192,138,62,.45)" }}
          >
            {site.ctaLabel} &rarr;
          </a>
        </div>

        <div
          className="grid flex-1 gap-9"
          style={{ flexBasis: 400, gridTemplateColumns: "repeat(auto-fit, minmax(118px, 1fr))" }}
        >
          <div>
            <p className="label mb-4 text-grey">{footer.servicesHeading}</p>
            <ul className="flex flex-col gap-2.5">
              {footer.services.map((item) => (
                <li key={item} className="text-body" style={{ fontSize: 15, fontWeight: 300 }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label mb-4 text-grey">{footer.companyHeading}</p>
            <ul className="flex flex-col gap-2.5">
              {footer.companyLinks.map((link) => (
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
            <p className="label mb-4 text-grey">{footer.connectHeading}</p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href={footer.linkedinUrl}
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
                  href={`mailto:${footer.email}`}
                  className="text-body transition-colors hover:text-paper"
                  style={{ fontSize: 15, fontWeight: 300 }}
                >
                  {footer.email}
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
          {footer.legalLine}
        </p>
      </div>
    </footer>
  );
}
