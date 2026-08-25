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
          We&rsquo;re a small team that takes on complex technical work other
          teams don&rsquo;t have the capacity to own.
        </p>
        <p className="max-w-[62ch] text-body" style={{ fontSize: 17, fontWeight: 300, lineHeight: 1.7 }}>
          The people who scope the work are the people who build it.
          There&rsquo;s no handoff to a delivery team and nothing gets lost
          between the architecture conversation and the code. One team
          stays accountable for the system in production, across
          application, data and cloud.
        </p>
      </div>
    </section>
  );
}
