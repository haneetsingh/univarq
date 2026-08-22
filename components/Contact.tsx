export function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-rule px-6 py-22 sm:px-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 border border-rule bg-slate p-11 sm:p-16">
        <p className="label text-brass">04 — Contact</p>
        <h2
          className="max-w-2xl font-display font-semibold text-paper"
          style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)" }}
        >
          Tell us what you're trying to build.
        </h2>
        <p className="max-w-[62ch] text-body">
          Reach out with a brief description of the problem, whether
          it&rsquo;s a new build, an embedded team or a system that needs
          modernizing. We respond within one business day.
        </p>
        <a
          href="mailto:info@univarq.io"
          className="border border-brass bg-brass px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-brass-hover hover:border-brass-hover"
        >
          info@univarq.io
        </a>
      </div>
    </section>
  );
}
