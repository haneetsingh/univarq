"use client";

import posthog from "posthog-js";
import content from "@/content/homepage.json";

const { faq } = content;

export function Faq() {
  return (
    <section className="border-t border-rule bg-slate px-6 py-14 sm:px-8 sm:py-22">
      <div className="mx-auto grid max-w-6xl grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-9">
        <div>
          <p className="label mb-4 text-brass">{faq.eyebrow}</p>
          <h2 className="max-w-[16ch] font-display text-[clamp(26px,3.2vw,38px)] font-semibold leading-[1.1] tracking-[-0.03em] text-paper">
            {faq.heading}
          </h2>
        </div>

        <div>
          {faq.items.map((item, i) => (
            <details
              key={item.question}
              open={i === 0}
              className={`group py-5 ${
                i < faq.items.length - 1 ? "border-b border-rule" : ""
              }`}
              onToggle={(e) => {
                if ((e.currentTarget as HTMLDetailsElement).open) {
                  posthog.capture("faq_item_expanded", {
                    question: item.question,
                    index: i,
                  });
                }
              }}
            >
              <summary className="cursor-pointer list-none font-display text-[18px] font-medium text-paper transition-colors hover:text-brass [&::-webkit-details-marker]:hidden">
                {item.question}
              </summary>
              <p className="mt-3.5 max-w-[62ch] text-[16px] font-light leading-[1.7] text-body">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
