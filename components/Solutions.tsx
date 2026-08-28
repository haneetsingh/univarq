import content from "@/content/homepage.json";

const { solutions } = content;

export function Solutions() {
  return (
    <section id="solutions" className="border-t border-rule px-6 py-14 sm:px-8 sm:py-22">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-end gap-6 sm:grid-cols-2">
          <div>
            <p className="label mb-4 text-brass">{solutions.eyebrow}</p>
            <h2 className="type-h2 text-paper">
              {solutions.heading}
            </h2>
          </div>
          <p className="text-grey">
            {solutions.subheading}
          </p>
        </div>

        <dl className="mt-11 border-t border-rule">
          {solutions.items.map((item) => (
            <div
              key={item.term}
              className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-2 gap-x-10 border-b border-rule py-5.5"
            >
              <dt className="font-display text-[20px] font-medium tracking-[-0.02em] text-paper">
                {item.term}
              </dt>
              <dd className="type-card-body text-body">
                {item.description}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 grid gap-9 sm:grid-cols-2">
          <h3 className="max-w-[18ch] font-display text-[26px] font-semibold tracking-[-0.025em] text-paper">
            {solutions.fitHeading}
          </h3>
          <ul className="flex flex-col gap-3.5">
            {solutions.fitItems.map((item) => (
              <li key={item} className="grid grid-cols-[20px_1fr] gap-2">
                <span
                  aria-hidden="true"
                  className="mt-2.25 h-1.75 w-1.75 bg-blueprint"
                />
                <span className="type-card-body text-body">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 font-display text-[19px] font-normal tracking-[-0.02em] text-paper">
          {solutions.closingLine}
        </p>
      </div>
    </section>
  );
}
