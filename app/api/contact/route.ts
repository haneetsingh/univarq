import { NextResponse } from "next/server";
import { getPostHogClient } from "@/lib/posthog-server";

const RESEND_API_URL = "https://api.resend.com/emails";
const FROM_ADDRESS = "Univarq <info@univarq.io>";

type ContactSubmission = {
  name?: string;
  email?: string;
  companyName?: string;
  message?: string;
  reference?: string;
  honeypot?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendEmail(apiKey: string, body: Record<string, unknown>) {
  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Resend request failed (${response.status}): ${text}`);
  }
}

export async function POST(request: Request) {
  let data: ContactSubmission;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (data.honeypot) {
    // Spam caught by the honeypot; report success without sending anything.
    return NextResponse.json({ ok: true });
  }

  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const companyName = (data.companyName ?? "").trim();
  const message = (data.message ?? "").trim();
  const reference = (data.reference ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set; cannot send contact form emails.");
    return NextResponse.json({ error: "Email not configured" }, { status: 500 });
  }

  const firstName = name.split(" ")[0];

  try {
    await Promise.all([
      // Internal notification.
      sendEmail(apiKey, {
        from: FROM_ADDRESS,
        to: "info@univarq.io",
        reply_to: email,
        subject: reference
          ? `New contact form submission from ${name} [${reference}]`
          : `New contact form submission from ${name}`,
        text: [
          reference ? `Reference: ${reference}` : null,
          `Name: ${name}`,
          `Email: ${email}`,
          companyName ? `Company: ${companyName}` : null,
          "",
          message,
        ]
          .filter(Boolean)
          .join("\n"),
      }),
      // Confirmation copy back to the sender.
      sendEmail(apiKey, {
        from: FROM_ADDRESS,
        to: email,
        subject: "We got your message",
        html: `
          <p>Hi ${escapeHtml(firstName)},</p>
          <p>Thanks for reaching out to Univarq. Here's a copy of what you sent us:</p>
          <blockquote style="border-left:2px solid #c08a3e;margin:16px 0;padding-left:16px;color:#333;">
            ${escapeHtml(message).replace(/\n/g, "<br>")}
          </blockquote>
          <p>We'll get back to you within one business day.</p>
          ${reference ? `<p style="color:#79838f;font-size:13px;">Reference: ${escapeHtml(reference)}</p>` : ""}
          <p>&mdash; Univarq</p>
        `,
        text: `Hi ${firstName},\n\nThanks for reaching out to Univarq. Here's a copy of what you sent us:\n\n${message}\n\nWe'll get back to you within one business day.\n${reference ? `\nReference: ${reference}\n` : ""}\n— Univarq`,
      }),
    ]);
  } catch (error) {
    console.error("Failed to send contact form emails", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 502 });
  }

  const distinctId = request.headers.get("x-posthog-distinct-id") ?? reference;
  const posthog = getPostHogClient();
  posthog.capture({
    distinctId,
    event: "contact_received",
    properties: {
      has_company: Boolean(companyName),
      message_length: message.length,
      reference,
    },
  });
  await posthog.flush();

  return NextResponse.json({ ok: true });
}
