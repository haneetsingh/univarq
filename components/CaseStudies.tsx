import content from "@/content/homepage.json";

const { caseStudies } = content;

export function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="border-t border-rule bg-slate px-6 py-14 sm:px-8 sm:py-22"
    >
      <div className="mx-auto max-w-6xl">
        <p className="label mb-4 text-brass">{caseStudies.eyebrow}</p>
        <h2
          className="font-display font-semibold text-paper"
          style={{ fontSize: "clamp(30px, 4.2vw, 46px)", lineHeight: 1.08, letterSpacing: "-0.03em" }}
        >
          {caseStudies.heading}
        </h2>

        <div
          className="mt-11 grid gap-7"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}
        >
          {caseStudies.items.map((study) => (
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
