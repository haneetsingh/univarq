import content from "@/content/homepage.json";

const { solutions } = content;

export function Solutions() {
  return (
    <section id="solutions" className="border-t border-rule px-6 py-14 sm:px-8 sm:py-22">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-end gap-6 sm:grid-cols-2">
          <div>
            <p className="label mb-4 text-brass">{solutions.eyebrow}</p>
            <h2
              className="font-display font-semibold text-paper"
              style={{ fontSize: "clamp(30px, 4.2vw, 46px)", lineHeight: 1.08, letterSpacing: "-0.03em" }}
            >
              {solutions.heading}
            </h2>
          </div>
          <p className="text-grey" style={{ fontSize: 17, fontWeight: 300 }}>
            {solutions.subheading}
          </p>
        </div>

        <dl className="mt-11 border-t border-rule">
          {solutions.items.map((item) => (
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
            {solutions.fitHeading}
          </h3>
          <ul className="flex flex-col gap-3.5">
            {solutions.fitItems.map((item) => (
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
          {solutions.closingLine}
        </p>
      </div>
    </section>
  );
}
