const CAPABILITIES = [
  "Web and enterprise applications, frontend to backend",
  "Cloud infrastructure and platform engineering",
  "System integration and API design",
  "Data platforms and pipelines",
  "AI-enabled features and workflow automation",
  "Legacy modernization and technical strategy",
];

export function Services() {
  return (
    <section
      id="services"
      className="border-t border-rule px-6 py-22 sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <p className="label mb-4 text-brass">02 — What We Do</p>
        <h2
          className="max-w-2xl font-display font-semibold text-paper"
          style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
        >
          Full-stack engineering, start to finish.
        </h2>
        <p className="mt-6 max-w-[62ch] text-body">
          One team, the whole stack. We build the frontend, the backend, the
          APIs that connect them and the cloud infrastructure they run on,
          so you&rsquo;re not stitching together three vendors&rsquo; worth
          of handoffs.
        </p>

        <ul className="mt-14 grid gap-x-10 gap-y-5 sm:grid-cols-2">
          {CAPABILITIES.map((item) => (
            <li
              key={item}
              className="flex items-baseline gap-3 border-b border-rule py-4 text-[15px] text-body"
            >
              <span aria-hidden="true" className="text-brass">
                &mdash;
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
