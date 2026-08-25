import content from "@/content/homepage.json";

const { positioning } = content;

export function Positioning() {
  return (
    <section className="border-t border-rule px-6 py-13 sm:px-8 sm:py-20">
      <div
        className="mx-auto grid max-w-6xl gap-9"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}
      >
        <p
          className="font-display text-paper"
          style={{ fontSize: "clamp(22px, 2.4vw, 30px)", fontWeight: 400, lineHeight: 1.3, letterSpacing: "-0.02em" }}
        >
          {positioning.quote}
        </p>
        <p className="max-w-[62ch] text-body" style={{ fontSize: 17, fontWeight: 300, lineHeight: 1.7 }}>
          {positioning.body}
        </p>
      </div>
    </section>
  );
}
