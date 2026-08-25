import content from "@/content/homepage.json";

const { faq } = content;

export function Faq() {
  return (
    <section className="border-t border-rule bg-slate px-6 py-14 sm:px-8 sm:py-22">
      <div
        className="mx-auto grid max-w-6xl gap-9"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
      >
        <div>
          <p className="label mb-4 text-brass">{faq.eyebrow}</p>
          <h2
            className="max-w-[16ch] font-display font-semibold text-paper"
            style={{ fontSize: "clamp(26px, 3.2vw, 38px)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
          >
            {faq.heading}
          </h2>
        </div>

        <div>
          {faq.items.map((item, i) => (
            <details
              key={item.question}
              open={i === 0}
              className="group py-5"
              style={{
                borderBottom: i < faq.items.length - 1 ? "1px solid var(--color-rule)" : "none",
              }}
            >
              <summary
                className="cursor-pointer list-none font-display font-medium text-paper"
                style={{ fontSize: 18 }}
              >
                {item.question}
              </summary>
              <p className="mt-3.5 max-w-[62ch] text-body" style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.7 }}>
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
