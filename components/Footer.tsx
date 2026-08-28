"use client";

import posthog from "posthog-js";
import { Mark } from "./Mark";
import { CONTACT_ADDRESS } from "@/lib/email";
import content from "@/content/homepage.json";

const { footer, site } = content;

export function Footer() {
  return (
    <footer className="border-t border-rule bg-slate px-6 py-11 sm:px-8 sm:py-17">
      <div className="mx-auto flex max-w-6xl flex-wrap gap-9 sm:gap-18">
        <div className="flex flex-1 basis-[300px] flex-col gap-5" style={{ maxWidth: 520 }}>
          <div className="flex items-center gap-2.5">
            <Mark size={27} />
            <span className="font-display text-[22px] font-semibold leading-none tracking-[-0.035em] text-paper">
              Univarq
            </span>
          </div>
          <p className="font-display text-[19px] text-paper">
            {footer.tagline}
          </p>
          <a
            href="#contact"
            onClick={() => posthog.capture("cta_clicked", { label: site.ctaLabel, position: "footer" })}
            className="w-fit border-b border-b-[rgba(192,138,62,.45)] text-brass transition-colors hover:text-brass-hover"
          >
            {site.ctaLabel} &rarr;
          </a>
        </div>

        <div
          className="grid flex-1 basis-[400px] grid-cols-[repeat(auto-fit,minmax(118px,1fr))] gap-9"
        >
          <div>
            <p className="label mb-4 text-grey">{footer.servicesHeading}</p>
            <ul className="flex flex-col gap-2.5">
              {footer.services.map((item) => (
                <li key={item} className="text-[15px] font-light text-body">
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
                    onClick={() => posthog.capture("footer_link_clicked", { label: link.label, href: link.href })}
                    className="text-[15px] font-light text-body transition-colors hover:text-paper"
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
                  onClick={() => posthog.capture("outbound_link_clicked", { destination: "linkedin", location: "footer" })}
                  className="text-[15px] font-light text-body transition-colors hover:text-paper"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_ADDRESS}`}
                  onClick={() => posthog.capture("outbound_link_clicked", { destination: "email", location: "footer" })}
                  className="text-[15px] font-light text-body transition-colors hover:text-paper"
                >
                  {CONTACT_ADDRESS}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-11 flex max-w-6xl flex-wrap justify-between gap-3 border-t border-rule pt-6.5">
        <p className="font-label text-[11.5px] tracking-[0.1em] text-faint">
          &copy; {new Date().getFullYear()} Univarq Technologies
        </p>
        <p className="font-label text-[11.5px] tracking-[0.1em] text-faint">
          {footer.legalLine}
        </p>
      </div>
    </footer>
  );
}
