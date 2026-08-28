import content from "@/content/homepage.json";

const { whyUnivarq } = content;

export function WhyUnivarq() {
  return (
    <section className="border-t border-rule bg-slate px-6 py-14 sm:px-8 sm:py-22">
      <div className="mx-auto max-w-6xl">
        <p className="label mb-4 text-brass">{whyUnivarq.eyebrow}</p>
        <h2 className="type-h2 text-paper">
          {whyUnivarq.heading}
        </h2>

        <div className="mt-11 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-9">
          {whyUnivarq.items.map((item) => (
            <div key={item.title} className="border-t-2 border-rule-strong pt-6">
              <h3 className="font-display text-[21px] font-semibold leading-[1.3] tracking-[-0.02em] text-paper">
                {item.title}
              </h3>
              <p className="type-card-body mt-3 text-body">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
