"use client";

import { useState, type FocusEvent, type FormEvent } from "react";
import posthog from "posthog-js";
import { Field } from "./contact-form/Field";
import { MessageField } from "./contact-form/MessageField";
import { ErrorBanner } from "./contact-form/ErrorBanner";
import { SubmitButton } from "./contact-form/SubmitButton";
import { Turnstile } from "./contact-form/Turnstile";
import {
  referenceId,
  validateField,
  type FieldErrors,
  type FieldName,
  type Status,
  type SuccessInfo,
} from "./contact-form/utils";

type ContactFormProps = {
  onSuccess?: (info: SuccessInfo) => void;
};

export function ContactForm({ onSuccess }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [messageLength, setMessageLength] = useState(0);
  const [networkError, setNetworkError] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);

  function handleBlur(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.currentTarget;
    if (name !== "name" && name !== "email" && name !== "message") return;
    const message = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: message }));
  }

  function handleChange(name: FieldName) {
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const reference = referenceId();

    // Honeypot: hidden field a real user never fills in.
    if (formData.get("honeypot")) {
      onSuccess?.({
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        reference,
      });
      setStatus("success");
      return;
    }

    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const message = String(formData.get("message") ?? "");

    const nextErrors: FieldErrors = {
      name: validateField("name", name),
      email: validateField("email", email),
      message: validateField("message", message),
    };
    setErrors(nextErrors);

    const firstInvalid = (["name", "email", "message"] as FieldName[]).find(
      (field) => nextErrors[field]
    );
    if (firstInvalid) {
      setStatus("error");
      setNetworkError(false);
      form.querySelector<HTMLInputElement | HTMLTextAreaElement>(
        `[name="${firstInvalid}"]`
      )?.focus();
      return;
    }

    if (!turnstileToken) {
      setStatus("error");
      setNetworkError(true);
      return;
    }

    setStatus("submitting");
    setNetworkError(false);

    const companyName = String(formData.get("companyName") ?? "");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-POSTHOG-DISTINCT-ID": posthog.get_distinct_id() ?? "",
          "X-POSTHOG-SESSION-ID": posthog.get_session_id() ?? "",
        },
        body: JSON.stringify({
          name,
          email,
          companyName,
          message,
          reference,
          turnstileToken,
        }),
      });

      if (!response.ok) throw new Error("Submission failed");

      onSuccess?.({ name, email, reference });
      setStatus("success");
      form.reset();
      setMessageLength(0);
      posthog.capture("contact_form_submitted", {
        has_company: Boolean(companyName),
        message_length: message.length,
        reference,
      });
    } catch (err) {
      setStatus("error");
      setNetworkError(true);
      // Turnstile tokens are single-use; force a fresh challenge.
      setTurnstileToken("");
      setTurnstileResetKey((k) => k + 1);
      posthog.captureException(err);
      posthog.capture("contact_form_error", {
        reference,
      });
    }
  }

  const submitting = status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex w-full max-w-xl flex-col gap-6"
    >
      <p className="hidden">
        <label>
          Leave this blank
          <input name="honeypot" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      {status === "error" && (
        <ErrorBanner
          networkError={networkError}
          invalidCount={Object.values(errors).filter(Boolean).length}
        />
      )}

      <Field
        id="name"
        name="name"
        label="Name"
        required
        disabled={submitting}
        error={errors.name}
        onBlur={handleBlur}
        onChange={() => handleChange("name")}
        placeholder="Your name"
        autoComplete="name"
      />

      <Field
        id="email"
        name="email"
        label="Work email"
        type="email"
        required
        disabled={submitting}
        error={errors.email}
        onBlur={handleBlur}
        onChange={() => handleChange("email")}
        placeholder="you@company.com"
        autoComplete="email"
      />

      <Field
        id="companyName"
        name="companyName"
        label="Company"
        labelSuffix={
          <span className="font-body text-[12.5px] normal-case tracking-normal text-faint">
            optional
          </span>
        }
        disabled={submitting}
        placeholder="Company name"
        autoComplete="organization"
      />

      <MessageField
        disabled={submitting}
        error={errors.message}
        messageLength={messageLength}
        onBlur={handleBlur}
        onMessageChange={(e) => {
          setMessageLength(e.currentTarget.value.length);
          handleChange("message");
        }}
      />

      <Turnstile
        onVerify={setTurnstileToken}
        onExpire={() => setTurnstileToken("")}
        resetKey={turnstileResetKey}
      />

      <SubmitButton submitting={submitting} />
    </form>
  );
}
