const WHY = [
  {
    title: "The engagement model is agreed up front",
    description:
      "Every engagement runs as a Build, an Embed or a Modernize, settled before anything starts. You know how we're working together, not just who happens to be on the call.",
  },
  {
    title: "We finish in production",
    description:
      "The engagement isn't done when a document lands. It's done when the system runs and the team that owns it can operate it, with the architecture decisions written down.",
  },
  {
    title: "Small by design",
    description:
      "We take on a few engagements at a time. That is the whole reason the other two claims hold up. If we aren't the right fit for the problem, we'll say so in the first conversation.",
  },
];

export function WhyUnivarq() {
  return (
    <section className="border-t border-rule bg-slate px-6 py-14 sm:px-8 sm:py-22">
      <div className="mx-auto max-w-6xl">
        <p className="label mb-4 text-brass">03 &middot; Why Univarq</p>
        <h2
          className="font-display font-semibold text-paper"
          style={{ fontSize: "clamp(30px, 4.2vw, 46px)", lineHeight: 1.08, letterSpacing: "-0.03em" }}
        >
          Three things you can check.
        </h2>

        <div
          className="mt-11 grid gap-9"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
        >
          {WHY.map((item) => (
            <div key={item.title} className="border-t-2 border-rule-strong pt-6">
              <h3
                className="font-display font-semibold text-paper"
                style={{ fontSize: 21, lineHeight: 1.3, letterSpacing: "-0.02em" }}
              >
                {item.title}
              </h3>
              <p className="mt-3 text-body" style={{ fontSize: "16.5px", fontWeight: 300, lineHeight: 1.7 }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
