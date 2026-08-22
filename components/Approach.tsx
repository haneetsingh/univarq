const WHY = [
  {
    title: null,
    description:
      "The people who understand your problem are the ones building the fix. One team covers frontend, backend, cloud, data and AI, so your project never gets handed off to a specialist you've never met.",
  },
  {
    title: "We finish what we start.",
    description: "You get a working system. Someone else can write the deck.",
  },
  {
    title: null,
    description:
      "We've been embedded in a client's team, and we've run the whole initiative ourselves. We adapt to how you work, whatever that ends up looking like.",
  },
];

export function Approach() {
  return (
    <section
      id="approach"
      className="border-t border-rule px-6 py-22 sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <p className="label mb-4 text-brass">01 — About Univarq</p>
        <h2
          className="max-w-2xl font-display font-semibold text-paper"
          style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
        >
          Straight answers, not a committee.
        </h2>
        <div className="mt-6 flex max-w-[62ch] flex-col gap-5 text-body">
          <p>
            Univarq takes on hard technology problems and owns them. We
            don&rsquo;t hand you a recommendation and leave the building.
            We&rsquo;ve shipped systems at scale before and this
            isn&rsquo;t our first time doing it under pressure.
          </p>
          <p>
            The same team that understands the problem builds the solution,
            end to end, across frontend, backend, cloud infrastructure, data
            platforms and AI. Nobody gets handed off to a different
            specialist for every layer.
          </p>
          <p>
            Some engagements, we sit inside your team and build alongside
            them. Others, we own the whole initiative ourselves. Either way
            you&rsquo;re talking to the person doing the work, today, not
            an account manager relaying an update from someone who is.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-20 grid max-w-6xl gap-14 border-t border-rule pt-14 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] sm:gap-18">
        <div>
          <p className="label mb-4 text-brass">03 — Why Univarq</p>
          <h2
            className="font-display font-semibold text-paper"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
          >
            Why teams call Univarq.
          </h2>
        </div>

        <ul className="flex flex-col">
          {WHY.map((item, i) => (
            <li
              key={i}
              className="border-b border-rule py-9 first:pt-0 last:border-b-0"
            >
              {item.title && (
                <h3 className="font-display text-lg font-medium text-paper">
                  {item.title}
                </h3>
              )}
              <p
                className={`max-w-[62ch] text-[15px] leading-relaxed text-body ${
                  item.title ? "mt-3" : ""
                }`}
              >
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
