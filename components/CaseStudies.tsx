const CASE_STUDIES = [
  {
    number: "01",
    client: "A global insurance company",
    title: "Enterprise modernization",
    challenge:
      "Modernize a large enterprise platform while enabling multiple teams to deliver independently.",
    approach: "A micro-frontend architecture with federated GraphQL underneath it.",
    outcome:
      "Teams ship independently now, and delivery across the platform got faster.",
  },
  {
    number: "02",
    client: "A logistics company",
    title: "Enterprise supply chain platform",
    challenge: "Make operational data legible across the business.",
    approach: "A platform combining data visualization, APIs and a modern frontend.",
    outcome:
      "Clearer visibility into supply chain risk and operational dependencies.",
  },
  {
    number: "03",
    client: "A financial services company",
    title: "Commercial financing platform",
    challenge: "Simplify commercial financing workflows that had grown unwieldy.",
    approach:
      "One platform connecting data, APIs and the screens people actually work in, end to end.",
    outcome: "Fewer steps to get a deal through, on a platform that can grow.",
  },
];

export function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="border-t border-rule bg-slate px-6 py-14 sm:px-8 sm:py-22"
    >
      <div className="mx-auto max-w-6xl">
        <p className="label mb-4 text-brass">06 &middot; Case studies</p>
        <h2
          className="font-display font-semibold text-paper"
          style={{ fontSize: "clamp(30px, 4.2vw, 46px)", lineHeight: 1.08, letterSpacing: "-0.03em" }}
        >
          Three platforms we took ownership of.
        </h2>

        <div
          className="mt-11 grid gap-7"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}
        >
          {CASE_STUDIES.map((study) => (
            <div
              key={study.number}
              className="grid content-start gap-6.5 border border-rule bg-ink p-7 sm:p-10"
            >
              <div>
                <span className="font-label text-[13px] text-brass">{study.number}</span>
                <p className="label mt-2.5 text-grey">{study.client}</p>
                <h3
                  className="mt-2 font-display font-semibold text-paper"
                  style={{ fontSize: "clamp(24px, 2.4vw, 28px)", lineHeight: 1.2, letterSpacing: "-0.025em" }}
                >
                  {study.title}
                </h3>
              </div>
              <dl className="flex flex-col gap-4">
                <div>
                  <dt
                    className="font-label text-[11px] uppercase"
                    style={{ color: "var(--color-blueprint)" }}
                  >
                    Challenge
                  </dt>
                  <dd className="mt-1.5 text-body" style={{ fontSize: "16.5px", fontWeight: 300, lineHeight: 1.7 }}>
                    {study.challenge}
                  </dd>
                </div>
                <div>
                  <dt
                    className="font-label text-[11px] uppercase"
                    style={{ color: "var(--color-blueprint)" }}
                  >
                    Approach
                  </dt>
                  <dd className="mt-1.5 text-body" style={{ fontSize: "16.5px", fontWeight: 300, lineHeight: 1.7 }}>
                    {study.approach}
                  </dd>
                </div>
                <div>
                  <dt
                    className="font-label text-[11px] uppercase"
                    style={{ color: "var(--color-blueprint)" }}
                  >
                    Outcome
                  </dt>
                  <dd className="mt-1.5 text-paper" style={{ fontSize: "16.5px", fontWeight: 300, lineHeight: 1.7 }}>
                    {study.outcome}
                  </dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
