"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (formData.get("company")) {
      // Honeypot field caught a bot; report success without submitting.
      setStatus("success");
      return;
    }

    setStatus("submitting");

    const payload: Record<string, string> = { "form-name": "contact" };
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
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="max-w-[62ch] text-body">
        Thanks &mdash; we&rsquo;ve got it and will get back to you within
        one business day.
      </p>
    );
  }

  return (
    <form
      name="contact"
      onSubmit={handleSubmit}
      className="flex w-full max-w-xl flex-col gap-5"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="label text-grey">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="border border-rule-strong bg-transparent px-4 py-3 text-paper outline-none transition-colors focus:border-brass"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="label text-grey">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="border border-rule-strong bg-transparent px-4 py-3 text-paper outline-none transition-colors focus:border-brass"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="label text-grey">
          What are you trying to build?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="border border-rule-strong bg-transparent px-4 py-3 text-paper outline-none transition-colors focus:border-brass"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-fit border border-brass bg-brass px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-brass-hover hover:border-brass-hover disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send"}
      </button>

      {status === "error" && (
        <p className="text-sm text-body">
          Something went wrong. Email us directly at{" "}
          <a href="mailto:info@univarq.io" className="text-brass">
            info@univarq.io
          </a>
          .
        </p>
      )}
    </form>
  );
}
