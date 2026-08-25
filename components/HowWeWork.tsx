const STEPS = [
  { number: "01", title: "Understand", description: "Start with the problem, not the technology." },
  {
    number: "02",
    title: "Architect",
    description: "Define the technical approach, scope and path to production.",
  },
  { number: "03", title: "Build", description: "The same team designs and builds the solution." },
  {
    number: "04",
    title: "Ship",
    description: "Take the solution through testing, deployment and production.",
  },
  {
    number: "05",
    title: "Improve",
    description: "Stay involved where needed and keep improving what was built.",
  },
];

export function HowWeWork() {
  return (
    <section className="border-t border-rule px-6 py-14 sm:px-8 sm:py-22">
      <div className="mx-auto max-w-6xl">
        <p className="label mb-4 text-brass">04 &middot; How we work</p>
        <h2
          className="font-display font-semibold text-paper"
          style={{ fontSize: "clamp(30px, 4.2vw, 46px)", lineHeight: 1.08, letterSpacing: "-0.03em" }}
        >
          Five steps, one team.
        </h2>

        <ol
          className="mt-11 grid list-none gap-x-5 gap-y-7"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(168px, 1fr))" }}
        >
          {STEPS.map((step) => (
            <li key={step.number} className="border-t border-rule-strong pt-6">
              <span className="font-label text-[13px]" style={{ color: "var(--color-blueprint)" }}>
                {step.number}
              </span>
              <h3
                className="mt-3 font-display font-semibold text-paper"
                style={{ fontSize: 20, letterSpacing: "-0.02em" }}
              >
                {step.title}
              </h3>
              <p className="mt-2 text-grey" style={{ fontSize: "15.5px", fontWeight: 300, lineHeight: 1.65 }}>
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
