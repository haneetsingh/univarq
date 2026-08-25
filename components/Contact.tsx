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
      className="border-t border-rule px-6 pb-16 pt-14 sm:px-8 sm:pb-26 sm:pt-22"
    >
      <div
        className="mx-auto grid max-w-6xl gap-11"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}
      >
        <div>
          <p className="label mb-4 text-brass">10 &middot; Contact</p>
          <h2
            className="max-w-[18ch] font-display font-semibold text-paper"
            style={{ fontSize: "clamp(30px, 4.2vw, 46px)", lineHeight: 1.08, letterSpacing: "-0.03em" }}
          >
            Tell us what you&rsquo;re trying to build.
          </h2>
          <p className="mt-6 max-w-[46ch] text-body" style={{ fontSize: 17, fontWeight: 300, lineHeight: 1.7 }}>
            Tell us what you&rsquo;re building and your rough timeline. An
            engineer reads every message, so the reply comes from whoever
            would actually do the work.
          </p>
          <div className="mt-9 flex flex-col gap-3 border-t border-rule pt-6">
            <p className="text-grey" style={{ fontSize: 15 }}>
              Prefer a call?{" "}
              <a href="#" className="text-brass transition-colors hover:text-brass-hover">
                Book 20 minutes
              </a>
            </p>
            <p className="text-grey" style={{ fontSize: 15 }}>
              Or email{" "}
              <a
                href="mailto:info@univarq.io"
                className="text-brass transition-colors hover:text-brass-hover"
              >
                info@univarq.io
              </a>
            </p>
          </div>
        </div>

        <div className="border border-rule bg-slate p-7 sm:p-10">
          {success ? (
            <div ref={successRef} tabIndex={-1} className="flex flex-col items-start gap-6 outline-none">
              <Mark size={40} keystoneColor="success" />
              <div>
                <h3 className="font-display font-semibold text-paper" style={{ fontSize: 22 }}>
                  Message received.
                </h3>
                <p className="mt-2 text-body" style={{ fontSize: "16.5px", fontWeight: 300, lineHeight: 1.7 }}>
                  Thanks, {success.name.split(" ")[0]}. We sent a copy to{" "}
                  <span className="text-paper">{success.email}</span> and
                  will reply within one business day.
                </p>
              </div>
              <p className="font-label text-[11px] text-grey">REFERENCE {success.reference}</p>
            </div>
          ) : (
            <ContactForm onSuccess={setSuccess} />
          )}
        </div>
      </div>
    </section>
  );
}
