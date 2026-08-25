export function About() {
  return (
    <section id="about" className="border-t border-rule px-6 py-14 sm:px-8 sm:py-22">
      <div className="mx-auto max-w-6xl">
        <p className="label mb-4 text-brass">08 &middot; About</p>
        <h2
          className="max-w-[26ch] font-display font-semibold text-paper"
          style={{ fontSize: "clamp(28px, 3.8vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
        >
          Built by engineers who have spent years building systems that
          businesses depend on.
        </h2>

        <div
          className="mt-11 grid gap-9"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}
        >
          <p className="text-body" style={{ fontSize: 17, fontWeight: 300, lineHeight: 1.75 }}>
            Univarq Technologies is a small engineering practice that takes
            direct ownership of the hard technical work across the full
            stack, from architecture to application, data and cloud. Every
            engagement runs as a build, an embed or a modernization, agreed
            before the work starts.
          </p>
          <p className="text-body" style={{ fontSize: 17, fontWeight: 300, lineHeight: 1.75 }}>
            You work with the engineers directly. There&rsquo;s no account
            manager between the problem and the people solving it and no
            handoff from a sales layer to a delivery layer. The engineers
            who scope an engagement build it and stay involved through
            production.
          </p>
        </div>

        <div className="mt-11 flex flex-wrap gap-9 border-t border-rule pt-6.5">
          <a
            href="https://linkedin.com/company/univarq"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b pb-1 text-brass transition-colors hover:text-brass-hover"
            style={{ borderBottomColor: "rgba(192,138,62,.45)" }}
          >
            Univarq on LinkedIn &rarr;
          </a>
          <a
            href="mailto:info@univarq.io"
            className="border-b pb-1 text-brass transition-colors hover:text-brass-hover"
            style={{ borderBottomColor: "rgba(192,138,62,.45)" }}
          >
            info@univarq.io
          </a>
        </div>
      </div>
    </section>
  );
}
