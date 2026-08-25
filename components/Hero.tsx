import content from "@/content/homepage.json";

const { hero } = content;

export function Hero() {
  return (
    <section
      id="home"
      className="mx-auto grid max-w-6xl gap-9 px-6 pb-12 pt-14 sm:px-8 sm:pb-22 sm:pt-29"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))" }}
    >
      <div>
        <p className="label mb-7 text-brass">{hero.eyebrow}</p>
        <h1
          className="max-w-[19ch] font-display font-semibold text-paper"
          style={{
            fontSize: "clamp(2.5rem, 5.6vw, 4.5rem)",
            lineHeight: 1.04,
            letterSpacing: "-0.035em",
          }}
        >
          {hero.heading}
        </h1>
        <p className="mt-7.5 max-w-[54ch] text-body" style={{ fontSize: "clamp(17px, 1.5vw, 20px)", lineHeight: 1.65, fontWeight: 300 }}>
          {hero.lede}
        </p>
        <div className="mt-10.5 flex flex-wrap items-center gap-3.5">
          <a
            href="#contact"
            className="bg-brass px-6.5 py-4.5 text-sm font-medium text-ink transition-colors hover:bg-brass-hover"
          >
            {hero.primaryCta}
          </a>
          <a
            href="#case-studies"
            className="border border-rule-strong px-6.5 py-4.5 text-sm font-medium text-paper transition-colors hover:border-brass"
          >
            {hero.secondaryCta}
          </a>
        </div>
      </div>

      <div className="border border-rule bg-slate p-7 sm:p-8.5">
        <p className="label mb-5.5 text-grey">{hero.engagementModelsHeading}</p>
        <div>
          {hero.engagementModels.map((model, i) => (
            <div
              key={model.number}
              className="grid grid-cols-[28px_1fr] gap-3.5 py-4.5"
              style={{
                borderBottom:
                  i < hero.engagementModels.length - 1 ? "1px solid var(--color-rule)" : "none",
              }}
            >
              <span className="font-label text-[13px]" style={{ color: "var(--color-blueprint)" }}>
                {model.number}
              </span>
              <div>
                <p
                  className="font-display text-paper"
                  style={{ fontSize: 20, fontWeight: 500, letterSpacing: "-0.02em" }}
                >
                  {model.title}
                </p>
                <p className="mt-1 text-grey" style={{ fontSize: "14.5px", fontWeight: 300 }}>
                  {model.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5.5 border-t border-rule pt-5.5 text-grey" style={{ fontSize: "13.5px", fontWeight: 300 }}>
          {hero.footnote}
        </p>
      </div>
    </section>
  );
}
