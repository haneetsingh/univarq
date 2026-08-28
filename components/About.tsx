"use client";

import posthog from "posthog-js";
import { CONTACT_ADDRESS } from "@/lib/email";
import content from "@/content/homepage.json";

const { about } = content;

export function About() {
  return (
    <section id="about" className="border-t border-rule px-6 py-14 sm:px-8 sm:py-22">
      <div className="mx-auto max-w-6xl">
        <p className="label mb-4 text-brass">{about.eyebrow}</p>
        <h2 className="max-w-[26ch] font-display text-[clamp(28px,3.8vw,44px)] font-semibold leading-[1.1] tracking-[-0.03em] text-paper">
          {about.heading}
        </h2>

        <div className="mt-11 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-9">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="leading-[1.75] text-body">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-11 flex flex-wrap gap-9 border-t border-rule pt-6.5">
          <a
            href={about.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => posthog.capture("outbound_link_clicked", { destination: "linkedin", location: "about" })}
            className="link-brass"
          >
            {about.linkedinLabel}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a
            href={`mailto:${CONTACT_ADDRESS}`}
            onClick={() => posthog.capture("outbound_link_clicked", { destination: "email", location: "about" })}
            className="link-brass"
          >
            {CONTACT_ADDRESS}
          </a>
        </div>
      </div>
    </section>
  );
}
