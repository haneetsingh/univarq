const TECHNOLOGY = [
  { term: "Frontend", description: "React · Next.js · Angular · TypeScript" },
  { term: "Backend", description: "Node.js · Python · APIs · GraphQL" },
  {
    term: "Cloud & Platform",
    description: "AWS · Azure · Cloud infrastructure · CI/CD",
  },
  { term: "Data", description: "PostgreSQL · MongoDB · Data pipelines" },
  {
    term: "AI",
    description: "AI integration · Intelligent workflows · Automation",
  },
];

export function Technology() {
  return (
    <section className="border-t border-rule px-6 py-14 sm:px-8 sm:py-22">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-end gap-6 sm:grid-cols-2">
          <div>
            <p className="label mb-4 text-brass">07 &middot; Technology</p>
            <h2
              className="font-display font-semibold text-paper"
              style={{ fontSize: "clamp(30px, 4.2vw, 46px)", lineHeight: 1.08, letterSpacing: "-0.03em" }}
            >
              A snapshot, not a limit.
            </h2>
          </div>
          <p className="text-grey" style={{ fontSize: 17, fontWeight: 300 }}>
            We work across the modern stack. This is what we reach for most,
            not the limit of what we can do.
          </p>
        </div>

        <dl className="mt-11 border-t border-rule">
          {TECHNOLOGY.map((item) => (
            <div
              key={item.term}
              className="grid gap-1.5 border-b border-rule py-5"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", columnGap: 40 }}
            >
              <dt className="font-label text-[11px] uppercase text-grey">{item.term}</dt>
              <dd className="text-paper" style={{ fontSize: 17, fontWeight: 300 }}>
                {item.description}
              </dd>
            </div>
          ))}
        </dl>

        <p
          className="mt-6 font-display text-paper"
          style={{ fontSize: 19, fontWeight: 400, letterSpacing: "-0.02em" }}
        >
          We choose technology based on the problem, not the other way
          around.
        </p>
      </div>
    </section>
  );
}
