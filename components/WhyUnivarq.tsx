const WHY = [
  {
    title: "One team, every layer.",
    description:
      "The people who understand your problem are the ones building the fix. One team covers frontend, backend, cloud, data and AI, so your project never gets handed off to a specialist you've never met.",
  },
  {
    title: "We finish what we start.",
    description: "You get a working system. Someone else can write the deck.",
  },
  {
    title: "We fit how you work.",
    description:
      "We've been embedded in a client's team, and we've run the whole initiative ourselves. We adapt to how you work, whatever that ends up looking like.",
  },
];

export function WhyUnivarq() {
  return (
    <section id="why" className="border-t border-rule px-6 py-22 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="label mb-4">
          <a href="#why" className="text-brass no-underline hover:underline">
            02 — Why Univarq
          </a>
        </p>
        <h2
          className="max-w-2xl font-display font-semibold text-paper"
          style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
        >
          Why teams call Univarq.
        </h2>

        <div className="mt-14 grid gap-10 border-t border-rule pt-14 sm:grid-cols-3 sm:gap-8">
          {WHY.map((item) => (
            <div key={item.title} className="flex flex-col gap-3">
              <h3 className="font-display text-lg font-medium text-paper">
                {item.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-body">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
