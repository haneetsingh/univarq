import content from "@/content/homepage.json";

const { howWeWork } = content;

export function HowWeWork() {
  return (
    <section className="border-t border-rule px-6 py-14 sm:px-8 sm:py-22">
      <div className="mx-auto max-w-6xl">
        <p className="label mb-4 text-brass">{howWeWork.eyebrow}</p>
        <h2 className="type-h2 text-paper">
          {howWeWork.heading}
        </h2>

        <ol className="mt-11 grid list-none grid-cols-[repeat(auto-fit,minmax(168px,1fr))] gap-x-5 gap-y-7">
          {howWeWork.steps.map((step) => (
            <li key={step.number} className="border-t border-rule-strong pt-6">
              <span className="font-label text-[13px] text-blueprint">
                {step.number}
              </span>
              <h3 className="mt-3 font-display text-[20px] font-semibold tracking-[-0.02em] text-paper">
                {step.title}
              </h3>
              <p className="mt-2 text-[15.5px] font-light leading-[1.65] text-grey">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
