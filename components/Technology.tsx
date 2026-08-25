import content from "@/content/homepage.json";

const { technology } = content;

export function Technology() {
  return (
    <section className="border-t border-rule px-6 py-14 sm:px-8 sm:py-22">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-end gap-6 sm:grid-cols-2">
          <div>
            <p className="label mb-4 text-brass">{technology.eyebrow}</p>
            <h2
              className="font-display font-semibold text-paper"
              style={{ fontSize: "clamp(30px, 4.2vw, 46px)", lineHeight: 1.08, letterSpacing: "-0.03em" }}
            >
              {technology.heading}
            </h2>
          </div>
          <p className="text-grey" style={{ fontSize: 17, fontWeight: 300 }}>
            {technology.subheading}
          </p>
        </div>

        <dl className="mt-11 border-t border-rule">
          {technology.items.map((item) => (
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
          {technology.closingLine}
        </p>
      </div>
    </section>
  );
}
