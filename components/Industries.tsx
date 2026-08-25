import content from "@/content/homepage.json";

const { industries } = content;

export function Industries() {
  return (
    <section className="border-t border-rule px-6 py-14 sm:px-8 sm:py-22">
      <div className="mx-auto max-w-6xl">
        <p className="label mb-4 text-brass">{industries.eyebrow}</p>
        <h2
          className="font-display font-semibold text-paper"
          style={{ fontSize: "clamp(30px, 4.2vw, 46px)", lineHeight: 1.08, letterSpacing: "-0.03em" }}
        >
          {industries.heading}
        </h2>

        <dl className="mt-11 border-t border-rule">
          {industries.items.map((item) => (
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
