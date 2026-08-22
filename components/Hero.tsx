export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto flex max-w-6xl flex-col gap-8 px-6 pb-24 pt-20 sm:px-8 sm:pb-32 sm:pt-28"
    >
      <p className="label text-brass">One team. Every layer of the stack.</p>
      <h1
        className="max-w-3xl font-display font-semibold text-paper"
        style={{ fontSize: "clamp(2.5rem, 5vw, 4.25rem)", letterSpacing: "-0.03em" }}
      >
        We build the software your business actually runs on.
      </h1>
      <p className="max-w-[62ch] text-body" style={{ textWrap: "pretty" }}>
        Univarq takes ownership of technology problems from first sketch to
        production, whether that&rsquo;s frontend, backend, cloud, data or
        AI. We understand what you&rsquo;re trying to do, take it on as our
        own and we deliver it.
      </p>
      <div className="flex flex-wrap gap-4 pt-2">
        <a
          href="#contact"
          className="border border-brass bg-brass px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-brass-hover hover:border-brass-hover"
        >
          Start a conversation
        </a>
        <a
          href="#services"
          className="border border-rule-strong px-6 py-3 text-sm font-medium text-paper transition-colors hover:border-brass hover:text-brass"
        >
          See what we do
        </a>
      </div>
    </section>
  );
}
