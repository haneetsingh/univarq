"use client";

import { useEffect, useRef, useState } from "react";
import { Mark } from "./Mark";
import { ContactForm } from "./ContactForm";
import type { SuccessInfo } from "./contact-form/utils";

export function Contact() {
  const [success, setSuccess] = useState<SuccessInfo | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (success) successRef.current?.focus();
  }, [success]);

  return (
    <section
      id="contact"
      className="border-t border-rule px-6 py-22 sm:px-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 border border-rule bg-slate p-11 sm:p-16">
        <p className="label mb-4">
          <a href="#contact" className="text-brass no-underline hover:underline">
            04 — Contact
          </a>
        </p>

        {success ? (
          <div
            ref={successRef}
            tabIndex={-1}
            className="flex w-full flex-col items-start gap-7 outline-none"
          >
            <div className="flex items-center gap-4.5">
              <Mark size={52} keystoneColor="success" />
              <div className="flex flex-col gap-1.5">
                <span className="label" style={{ color: "var(--color-success)" }}>
                  Message received
                </span>
                <h2
                  className="font-display font-medium text-paper"
                  style={{ fontSize: 30, letterSpacing: "-0.02em", lineHeight: 1.15 }}
                >
                  Got it{success.name ? `, ${success.name.split(" ")[0]}` : ""}.
                </h2>
              </div>
            </div>
            <p className="max-w-[44ch] text-body" style={{ textWrap: "pretty" }}>
              A copy is on its way to{" "}
              <span className="text-paper">{success.email}</span>. Someone
              on the team will look it over and get in touch.
            </p>
            <div className="flex w-full flex-col gap-3 border-t border-rule pt-6">
              <span className="label text-grey">Reference</span>
              <span className="label" style={{ color: "var(--color-paper)", letterSpacing: 0 }}>
                {success.reference}
              </span>
            </div>
          </div>
        ) : (
          <>
            <h2
              className="max-w-2xl font-display font-semibold text-paper"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)" }}
            >
              Tell us what you&rsquo;re trying to build.
            </h2>
            <p className="max-w-[62ch] text-body">
              Send us a brief description of the problem, whether
              it&rsquo;s a new build, an embedded team or a system that
              needs modernizing. We respond within one business day.
            </p>
            <ContactForm onSuccess={setSuccess} />
          </>
        )}
      </div>
    </section>
  );
}
