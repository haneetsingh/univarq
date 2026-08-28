"use client";

import { useEffect, useRef, useState } from "react";
import posthog from "posthog-js";
import { Mark } from "./Mark";
import { ContactForm } from "./ContactForm";
import type { SuccessInfo } from "./contact-form/utils";
import { firstNameOf } from "@/lib/utils";
import { CONTACT_ADDRESS } from "@/lib/email";
import content from "@/content/homepage.json";

const { contact } = content;

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
          <p className="label mb-4 text-brass">{contact.eyebrow}</p>
          <h2
            className="max-w-[18ch] font-display font-semibold text-paper"
            style={{ fontSize: "clamp(30px, 4.2vw, 46px)", lineHeight: 1.08, letterSpacing: "-0.03em" }}
          >
            {contact.heading}
          </h2>
          <p className="mt-6 max-w-[46ch] text-body" style={{ fontSize: 17, fontWeight: 300, lineHeight: 1.7 }}>
            {contact.body}
          </p>
          <div className="mt-9 flex flex-col gap-3 border-t border-rule pt-6">
            <p className="text-grey" style={{ fontSize: 15 }}>
              Email{" "}
              <a
                href={`mailto:${CONTACT_ADDRESS}`}
                onClick={() => posthog.capture("outbound_link_clicked", { destination: "email", location: "contact" })}
                className="text-brass transition-colors hover:text-brass-hover"
              >
                {CONTACT_ADDRESS}
              </a>
            </p>
          </div>
        </div>

        <div
          className="border p-7 sm:p-10"
          style={
            success
              ? {
                  borderColor: "var(--color-success-border)",
                  background: "var(--color-success-bg)",
                }
              : {
                  borderColor: "var(--color-rule)",
                  background: "var(--color-slate)",
                }
          }
        >
          {success ? (
            <div ref={successRef} tabIndex={-1} className="flex flex-col items-start gap-6 outline-none">
              <Mark size={40} keystoneColor="success" />
              <div>
                <h3 className="font-display font-semibold text-paper" style={{ fontSize: 22 }}>
                  {contact.successHeading}
                </h3>
                <p className="mt-2 text-body" style={{ fontSize: "16.5px", fontWeight: 300, lineHeight: 1.7 }}>
                  Thanks, {firstNameOf(success.name)}. Your message is on its way
                  and a copy has been sent to{" "}
                  <span className="text-paper">{success.email}</span>
                </p>
              </div>
              <p
                className="font-label text-grey"
                style={{ fontSize: 12, fontWeight: 400, letterSpacing: "0.1em" }}
              >
                REFERENCE {success.reference}
              </p>
            </div>
          ) : (
            <ContactForm onSuccess={setSuccess} />
          )}
        </div>
      </div>
    </section>
  );
}
