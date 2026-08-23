export function About() {
  return (
    <section id="about" className="border-t border-rule px-6 py-22 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="label mb-4">
          <a href="#about" className="text-brass no-underline hover:underline">
            01 — About Univarq
          </a>
        </p>
        <h2
          className="max-w-2xl font-display font-semibold text-paper"
          style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
        >
          Straight answers, not a committee.
        </h2>
        <div className="mt-6 flex max-w-[62ch] flex-col gap-5 text-body">
          <p>
            Univarq takes on hard technology problems and owns them, instead
            of handing you a recommendation and leaving the building.
            We&rsquo;ve shipped systems at scale before, and this
            isn&rsquo;t our first time doing it under pressure.
          </p>
          <p>
            The same team that understands the problem builds the solution,
            end to end, across frontend, backend, cloud infrastructure, data
            platforms and AI. Nobody gets handed off to a different
            specialist for every layer.
          </p>
          <p>
            Some engagements, we sit inside your team and build alongside
            them. Others, we own the whole initiative ourselves. Either way
            you&rsquo;re talking to the person doing the work, today, not
            an account manager relaying an update from someone who is.
          </p>
        </div>
      </div>
    </section>
  );
}
