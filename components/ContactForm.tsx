"use client";

import { useEffect, useRef, useState, type FocusEvent, type FormEvent } from "react";
import { Field } from "./contact-form/Field";
import { MessageField } from "./contact-form/MessageField";
import { ErrorBanner } from "./contact-form/ErrorBanner";
import { SubmitButton } from "./contact-form/SubmitButton";
import {
  encode,
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
  const loadedAt = useRef<number | null>(null);
  useEffect(() => {
    loadedAt.current = Date.now();
  }, []);

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

    // Honeypot + timing check: real users take more than 2s to fill this in.
    if (
      formData.get("honeypot") ||
      (loadedAt.current !== null && Date.now() - loadedAt.current < 2000)
    ) {
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

    setStatus("submitting");
    setNetworkError(false);

    const payload: Record<string, string> = { "form-name": "contact", reference };
    formData.forEach((value, key) => {
      payload[key] = String(value);
    });

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(payload),
      });

      if (!response.ok) throw new Error("Submission failed");

      onSuccess?.({ name, email, reference });
      setStatus("success");
      form.reset();
      setMessageLength(0);
    } catch {
      setStatus("error");
      setNetworkError(true);
    }
  }

  const submitting = status === "submitting";

  return (
    <form
      name="contact"
      onSubmit={handleSubmit}
      noValidate
      className="flex w-full max-w-xl flex-col gap-6"
    >
      <input type="hidden" name="form-name" value="contact" />
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
        placeholder="John Doe"
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
      />

      <Field
        id="companyName"
        name="companyName"
        label="Company"
        labelSuffix={
          <span
            className="normal-case tracking-normal text-[12.5px]"
            style={{ fontFamily: "var(--font-body)", color: "var(--color-placeholder)" }}
          >
            optional
          </span>
        }
        disabled={submitting}
        placeholder="Where you work"
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

      <SubmitButton submitting={submitting} />
    </form>
  );
}
