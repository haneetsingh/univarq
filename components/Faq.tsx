const FAQS = [
  {
    question: "How do you price engagements?",
    answer:
      "Most work is scoped one of two ways. Either a fixed-scope project with a defined path to production, or an ongoing monthly engagement. Which one fits depends on the problem, so that's usually the first thing we work out on a call, not something we quote blind.",
  },
  {
    question: "Do you work with startups, or only larger companies?",
    answer:
      "Both. The real question is which engagement fits. A Build we own outright, or an Embed where we work inside your team.",
  },
  {
    question: "Can you augment an existing in-house team?",
    answer:
      "Yes. That's the Embed model. We work inside your engineering organization on the problems your team doesn't have capacity to own.",
  },
  {
    question: "Do you support what you build after launch?",
    answer:
      "Yes, where it makes sense. Some engagements end with a clean handoff; others continue as ongoing support or improvement work. We agree on which one up front, not after we ship.",
  },
  {
    question: "What's a typical engagement length?",
    answer:
      "It depends on the problem. A focused build might run a few months; an embedded or ongoing engagement can run much longer. If you're not sure yet what you need, a short diagnostic engagement is usually the better place to start.",
  },
];

export function Faq() {
  return (
    <section className="border-t border-rule bg-slate px-6 py-14 sm:px-8 sm:py-22">
      <div
        className="mx-auto grid max-w-6xl gap-9"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
      >
        <div>
          <p className="label mb-4 text-brass">09 &middot; Questions</p>
          <h2
            className="max-w-[16ch] font-display font-semibold text-paper"
            style={{ fontSize: "clamp(26px, 3.2vw, 38px)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
          >
            Before you get in touch.
          </h2>
        </div>

        <div>
          {FAQS.map((item, i) => (
            <details
              key={item.question}
              open={i === 0}
              className="group py-5"
              style={{
                borderBottom: i < FAQS.length - 1 ? "1px solid var(--color-rule)" : "none",
              }}
            >
              <summary
                className="cursor-pointer list-none font-display font-medium text-paper"
                style={{ fontSize: 18 }}
              >
                {item.question}
              </summary>
              <p className="mt-3.5 max-w-[62ch] text-body" style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.7 }}>
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
