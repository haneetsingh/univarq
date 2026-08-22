"use client";

import { useState } from "react";
import { Mark } from "./Mark";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section
      id="contact"
      className="border-t border-rule px-6 py-22 sm:px-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 border border-rule bg-slate p-11 sm:p-16">
        <p className="label text-brass">04 — Contact</p>

        {submitted ? (
          <>
            <div className="flex items-center gap-3 text-brass">
              <Mark size={28} />
            </div>
            <h2
              className="max-w-2xl font-display font-semibold text-paper"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)" }}
            >
              Message sent.
            </h2>
            <p className="max-w-[62ch] text-body">
              Thanks for reaching out. We&rsquo;ll get back to you within
              one business day.
            </p>
          </>
        ) : (
          <>
            <h2
              className="max-w-2xl font-display font-semibold text-paper"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)" }}
            >
              Tell us what you're trying to build.
            </h2>
            <p className="max-w-[62ch] text-body">
              Send us a brief description of the problem, whether
              it&rsquo;s a new build, an embedded team or a system that
              needs modernizing. We respond within one business day.
            </p>
            <ContactForm
              onStatusChange={(status) => setSubmitted(status === "success")}
            />
            <p className="text-sm text-grey">
              Or email us directly at{" "}
              <a href="mailto:info@univarq.io" className="text-brass">
                info@univarq.io
              </a>
            </p>
          </>
        )}
      </div>
    </section>
  );
}
