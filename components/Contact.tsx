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
      <div className="mx-auto grid max-w-6xl grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-11">
        <div>
          <p className="label mb-4 text-brass">{contact.eyebrow}</p>
          <h2 className="type-h2 max-w-[18ch] text-paper">
            {contact.heading}
          </h2>
          <p className="mt-6 max-w-[46ch] text-body">
            {contact.body}
          </p>
          <div className="mt-9 flex flex-col gap-3 border-t border-rule pt-6">
            <p className="text-[15px] text-grey">
              Email{" "}
              <a
                href={`mailto:${CONTACT_ADDRESS}`}
                onClick={() => posthog.capture("outbound_link_clicked", { destination: "email", location: "contact" })}
                className="link-brass"
              >
                {CONTACT_ADDRESS}
              </a>
            </p>
          </div>
        </div>

        <div
          className={`border p-7 sm:p-10 ${
            success
              ? "border-success-border bg-success-bg"
              : "border-rule bg-slate"
          }`}
        >
          {success ? (
            <div ref={successRef} tabIndex={-1} className="flex flex-col items-start gap-6 outline-none">
              <Mark size={40} keystoneColor="success" />
              <div>
                <h3 className="font-display text-[22px] font-semibold text-paper">
                  {contact.successHeading}
                </h3>
                <p className="type-card-body mt-2 text-body">
                  Thanks, {firstNameOf(success.name)}. Your message is on its way
                  {success.confirmationSent ? (
                    <>
                      {" "}
                      and a copy has been sent to{" "}
                      <span className="text-paper">{success.email}</span>
                    </>
                  ) : (
                    "."
                  )}
                </p>
              </div>
              {success.reference && (
                <p className="font-label text-[12px] font-normal tracking-[0.1em] text-grey">
                  REFERENCE {success.reference}
                </p>
              )}
            </div>
          ) : (
            <ContactForm onSuccess={setSuccess} />
          )}
        </div>
      </div>
    </section>
  );
}
