"use client";

import posthog from "posthog-js";
import content from "@/content/homepage.json";
import { Button } from "./Button";

const { hero } = content;

export function Hero() {
  return (
    <section
      id="home"
      className="mx-auto grid max-w-6xl grid-cols-[repeat(auto-fit,minmax(340px,1fr))] gap-9 px-6 pb-12 pt-14 sm:px-8 sm:pb-22 sm:pt-29"
    >
      <div>
        <p className="label mb-7 text-brass">{hero.eyebrow}</p>
        <h1 className="max-w-[19ch] font-display text-[clamp(2.5rem,5.6vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-paper">
          {hero.heading}
        </h1>
        <p className="mt-7.5 max-w-[54ch] text-[clamp(17px,1.5vw,20px)] font-light leading-[1.65] text-body">
          {hero.lede}
        </p>
        <div className="mt-10.5 flex flex-wrap items-center gap-3.5">
          <Button
            as="a"
            href="#contact"
            onClick={() => posthog.capture("cta_clicked", { label: hero.primaryCta, position: "hero_primary" })}
          >
            {hero.primaryCta}
          </Button>
          <Button
            as="a"
            href="#case-studies"
            variant="secondary"
            onClick={() => posthog.capture("cta_clicked", { label: hero.secondaryCta, position: "hero_secondary" })}
          >
            {hero.secondaryCta}
          </Button>
        </div>
      </div>

      <div className="border border-rule bg-slate p-7 sm:p-8.5">
        <p className="label mb-5.5 text-grey">{hero.engagementModelsHeading}</p>
        <div>
          {hero.engagementModels.map((model, i) => (
            <div
              key={model.number}
              className={`grid grid-cols-[28px_1fr] gap-3.5 py-4.5 ${
                i < hero.engagementModels.length - 1 ? "border-b border-rule" : ""
              }`}
            >
              <span className="font-label text-[13px] text-blueprint">
                {model.number}
              </span>
              <div>
                <p className="font-display text-[20px] font-medium tracking-[-0.02em] text-paper">
                  {model.title}
                </p>
                <p className="mt-1 text-[14.5px] font-light text-grey">
                  {model.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5.5 border-t border-rule pt-5.5 text-[13.5px] font-light text-grey">
          {hero.footnote}
        </p>
      </div>
    </section>
  );
}
