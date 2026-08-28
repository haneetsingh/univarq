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
        <h2 className="type-h2 text-paper">
          {caseStudies.heading}
        </h2>

        <div className="mt-11 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-7">
          {caseStudies.items.map((study) => (
            <div
              key={study.model}
              className="grid content-start gap-6.5 border border-rule bg-ink p-7 sm:p-10"
            >
              <div>
                <span className="label text-brass">{study.model}</span>
                <p className="label mt-2.5 text-grey">{study.sector}</p>
                <h3 className="mt-2 font-display text-[clamp(24px,2.4vw,28px)] font-semibold leading-[1.2] tracking-[-0.025em] text-paper">
                  {study.title}
                </h3>
              </div>
              <dl className="flex flex-col gap-4">
                <div>
                  <dt className="font-label text-[11px] uppercase text-blueprint">
                    Challenge
                  </dt>
                  <dd className="type-card-body mt-1.5 text-body">
                    {study.challenge}
                  </dd>
                </div>
                <div>
                  <dt className="font-label text-[11px] uppercase text-blueprint">
                    Approach
                  </dt>
                  <dd className="type-card-body mt-1.5 text-body">
                    {study.approach}
                  </dd>
                </div>
                <div>
                  <dt className="font-label text-[11px] uppercase text-blueprint">
                    Outcome
                  </dt>
                  <dd className="type-card-body mt-1.5 text-paper">
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
