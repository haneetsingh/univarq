import content from "@/content/homepage.json";

const { technology } = content;

export function Technology() {
  return (
    <section className="border-t border-rule px-6 py-14 sm:px-8 sm:py-22">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-end gap-6 sm:grid-cols-2">
          <div>
            <p className="label mb-4 text-brass">{technology.eyebrow}</p>
            <h2 className="type-h2 text-paper">
              {technology.heading}
            </h2>
          </div>
          <p className="text-grey">
            {technology.subheading}
          </p>
        </div>

        <dl className="mt-11 border-t border-rule">
          {technology.items.map((item) => (
            <div
              key={item.term}
              className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-1.5 gap-x-10 border-b border-rule py-5"
            >
              <dt className="font-label text-[11px] uppercase text-grey">{item.term}</dt>
              <dd className="text-paper">
                {item.description}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 font-display text-[19px] font-normal tracking-[-0.02em] text-paper">
          {technology.closingLine}
        </p>
      </div>
    </section>
  );
}
