const SOLUTIONS = [
  {
    term: "Business Applications",
    description:
      "Customer portals, internal platforms, operational systems and enterprise applications.",
  },
  {
    term: "Digital Platforms",
    description: "Web platforms and products designed to grow.",
  },
  {
    term: "Data & AI Solutions",
    description:
      "Data pipelines, intelligent workflows, AI-enabled products and automation.",
  },
  {
    term: "Cloud & Platform Engineering",
    description:
      "Cloud architecture, infrastructure, deployment pipelines and platform modernization.",
  },
  {
    term: "Integrations",
    description: "APIs, third-party integrations and systems that need to work together.",
  },
];

const FIT_ITEMS = [
  "Have a complex system but not enough engineering capacity to own it.",
  "Need to modernize without stopping the business.",
  "Are starting a new product or platform.",
  "Need someone to take ownership of a difficult technical initiative.",
  "Have too many systems that do not talk to each other.",
  "Want to introduce AI into an existing workflow without chasing hype.",
];

export function Solutions() {
  return (
    <section id="solutions" className="border-t border-rule px-6 py-14 sm:px-8 sm:py-22">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-end gap-6 sm:grid-cols-2">
          <div>
            <p className="label mb-4 text-brass">02 &middot; Solutions</p>
            <h2
              className="font-display font-semibold text-paper"
              style={{ fontSize: "clamp(30px, 4.2vw, 46px)", lineHeight: 1.08, letterSpacing: "-0.03em" }}
            >
              Five kinds of work.
            </h2>
          </div>
          <p className="text-grey" style={{ fontSize: 17, fontWeight: 300 }}>
            We choose technology based on the problem, not the other way
            around.
          </p>
        </div>

        <dl className="mt-11 border-t border-rule">
          {SOLUTIONS.map((item) => (
            <div
              key={item.term}
              className="grid gap-2 border-b border-rule py-5.5"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", columnGap: 40 }}
            >
              <dt
                className="font-display text-paper"
                style={{ fontSize: 20, fontWeight: 500, letterSpacing: "-0.02em" }}
              >
                {item.term}
              </dt>
              <dd className="text-body" style={{ fontSize: "16.5px", fontWeight: 300, lineHeight: 1.7 }}>
                {item.description}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 grid gap-9 sm:grid-cols-2">
          <h3
            className="max-w-[18ch] font-display font-semibold text-paper"
            style={{ fontSize: 26, letterSpacing: "-0.025em" }}
          >
            Built for teams that need to move.
          </h3>
          <ul className="flex flex-col gap-3.5">
            {FIT_ITEMS.map((item) => (
              <li key={item} className="grid gap-2" style={{ gridTemplateColumns: "20px 1fr" }}>
                <span
                  aria-hidden="true"
                  className="mt-2.25 h-1.75 w-1.75"
                  style={{ background: "var(--color-blueprint)" }}
                />
                <span className="text-body" style={{ fontSize: "16.5px", fontWeight: 300, lineHeight: 1.7 }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p
          className="mt-6 font-display text-paper"
          style={{ fontSize: 19, fontWeight: 400, letterSpacing: "-0.02em" }}
        >
          If the problem is complicated, that is usually where we are most
          useful.
        </p>
      </div>
    </section>
  );
}
