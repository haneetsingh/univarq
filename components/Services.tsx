const SERVICES = [
  {
    number: "01",
    title: "Build",
    description:
      "You have a problem. We build the solution. From a new application to a complete platform, Univarq takes ownership from architecture through production.",
  },
  {
    number: "02",
    title: "Embed",
    description:
      "Add engineering capacity without adding layers. Work directly with the engineering organization to solve hard problems, accelerate delivery and fill critical technical gaps.",
  },
  {
    number: "03",
    title: "Modernize",
    description:
      "Make existing systems ready for what comes next. Modernize legacy applications, architectures and infrastructure without forcing unnecessary rewrites.",
  },
];

export function Services() {
  return (
    <section id="services" className="border-t border-rule px-6 py-14 sm:px-8 sm:py-22">
      <div className="mx-auto max-w-6xl">
        <p className="label mb-4 text-brass">01 &middot; Services</p>
        <h2
          className="max-w-[24ch] font-display font-semibold text-paper"
          style={{ fontSize: "clamp(30px, 4.2vw, 46px)", lineHeight: 1.08, letterSpacing: "-0.03em" }}
        >
          Three ways to bring us in.
        </h2>

        <div
          className="mt-11 grid gap-7"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
        >
          {SERVICES.map((service) => (
            <div
              key={service.number}
              className="border border-rule bg-slate p-7 transition-colors hover:border-rule-strong sm:p-9"
            >
              <span className="font-label text-[13px]" style={{ color: "var(--color-blueprint)" }}>
                {service.number}
              </span>
              <h3
                className="mt-3 font-display font-semibold text-paper"
                style={{ fontSize: 26, letterSpacing: "-0.025em" }}
              >
                {service.title}
              </h3>
              <p className="mt-4 text-body" style={{ fontSize: "16.5px", fontWeight: 300, lineHeight: 1.7 }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
