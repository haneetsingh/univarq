import content from "@/content/homepage.json";

const { positioning } = content;

export function Positioning() {
  return (
    <section className="border-t border-rule px-6 py-13 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-9">
        <p className="font-display text-[clamp(22px,2.4vw,30px)] font-normal leading-[1.3] tracking-[-0.02em] text-paper">
          {positioning.quote}
        </p>
        <p className="max-w-[62ch] text-body">
          {positioning.body}
        </p>
      </div>
    </section>
  );
}
