const INDUSTRIES = [
  {
    term: "Insurance",
    description:
      "We build the platforms and internal applications insurers run on, and modernize the workflows behind them.",
  },
  {
    term: "Banking & Financial Services",
    description:
      "Banking and financing platforms, data-heavy applications and the integrations that tie them to the rest of the financial stack.",
  },
  {
    term: "Supply Chain & Logistics",
    description:
      "Operational platforms and risk intelligence that make a multi-tier supply network legible.",
  },
  {
    term: "Enterprise Technology",
    description:
      "Modernization work, cloud engineering and application platforms built to grow with the business.",
  },
  {
    term: "Healthcare & Life Sciences",
    description:
      "Clinical and operational systems built to meet real integration and audit requirements.",
  },
  {
    term: "Real Estate & Construction",
    description:
      "Project, asset and transaction platforms that replace spreadsheet-driven process.",
  },
  {
    term: "Manufacturing & Industrial",
    description:
      "Production data and operational visibility, joined up across plant and enterprise systems.",
  },
  {
    term: "Professional Services",
    description: "Client portals, billing and delivery platforms for process-driven firms.",
  },
];

export function Industries() {
  return (
    <section className="border-t border-rule px-6 py-14 sm:px-8 sm:py-22">
      <div className="mx-auto max-w-6xl">
        <p className="label mb-4 text-brass">05 &middot; Industries</p>
        <h2
          className="font-display font-semibold text-paper"
          style={{ fontSize: "clamp(30px, 4.2vw, 46px)", lineHeight: 1.08, letterSpacing: "-0.03em" }}
        >
          Where we&rsquo;ve worked.
        </h2>

        <dl className="mt-11 border-t border-rule">
          {INDUSTRIES.map((item) => (
            <div
              key={item.term}
              className="grid gap-2 border-b border-rule py-5.5"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", columnGap: 40 }}
            >
              <dt
                className="font-display text-paper"
                style={{ fontSize: 19, fontWeight: 500, letterSpacing: "-0.02em" }}
              >
                {item.term}
              </dt>
              <dd className="text-body" style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.7 }}>
                {item.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
