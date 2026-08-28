import content from "@/content/homepage.json";

const { industries } = content;

export function Industries() {
  return (
    <section className="border-t border-rule px-6 py-14 sm:px-8 sm:py-22">
      <div className="mx-auto max-w-6xl">
        <p className="label mb-4 text-brass">{industries.eyebrow}</p>
        <h2 className="type-h2 text-paper">
          {industries.heading}
        </h2>

        <dl className="mt-11 border-t border-rule">
          {industries.items.map((item) => (
            <div
              key={item.term}
              className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-2 gap-x-10 border-b border-rule py-5.5"
            >
              <dt className="font-display text-[19px] font-medium tracking-[-0.02em] text-paper">
                {item.term}
              </dt>
              <dd className="text-[16px] font-light leading-[1.7] text-body">
                {item.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
