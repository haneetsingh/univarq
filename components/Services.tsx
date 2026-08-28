import content from "@/content/homepage.json";

const { services } = content;

export function Services() {
  return (
    <section id="services" className="border-t border-rule px-6 py-14 sm:px-8 sm:py-22">
      <div className="mx-auto max-w-6xl">
        <p className="label mb-4 text-brass">{services.eyebrow}</p>
        <h2 className="type-h2 max-w-[24ch] text-paper">
          {services.heading}
        </h2>

        <div className="mt-11 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-7">
          {services.items.map((service) => (
            <div
              key={service.number}
              className="border border-rule bg-slate p-7 transition-colors hover:border-rule-strong sm:p-9"
            >
              <span className="font-label text-[13px] text-blueprint">
                {service.number}
              </span>
              <h3 className="mt-3 font-display text-[26px] font-semibold tracking-[-0.025em] text-paper">
                {service.title}
              </h3>
              <p className="type-card-body mt-4 text-body">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
