import { NextResponse } from "next/server";
import { getPostHogClient } from "@/lib/posthog-server";
import {
  clientIp,
  createRateLimiter,
  escapeHtml,
  firstNameOf,
} from "@/lib/utils";
import {
  CONTACT_ADDRESS,
  isEmailConfigured,
  sendEmail,
  type EmailPayload,
} from "@/lib/email";

const MESSAGE_MAX = 1200;
const MAX_BODY_BYTES = 16 * 1024;

const rateLimit = createRateLimiter(5, 10 * 60 * 1000);

const TURNSTILE_ACTION = "contact";
const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type ContactSubmission = {
  name?: string;
  email?: string;
  companyName?: string;
  message?: string;
  reference?: string;
  honeypot?: string;
  turnstileToken?: string;
};

// Verify a Cloudflare Turnstile token. Returns true when Turnstile is not
// configured, so the form still works without it.
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) return true;

  const expectedHostnames = new Set(
    (process.env.TURNSTILE_HOSTNAMES ?? "")
      .split(",")
      .map((h) => h.trim())
      .filter(Boolean)
  );

  if (!token || token.length > 2048 || expectedHostnames.size === 0) {
    return false;
  }

  let result: { success?: boolean; action?: string; hostname?: string };
  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: AbortSignal.timeout(10_000),
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    if (!res.ok) throw new Error(`siteverify ${res.status}`);
    result = await res.json();
  } catch (err) {
    console.error("Turnstile siteverify failed", err);
    return false;
  }

  return (
    result.success === true &&
    result.action === TURNSTILE_ACTION &&
    typeof result.hostname === "string" &&
    expectedHostnames.has(result.hostname)
  );
}

export async function POST(request: Request) {
  const ip = clientIp(request);

  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  let data: ContactSubmission;
  try {
    data = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (data.honeypot) {
    // Honeypot tripped; fake success, send nothing.
    return NextResponse.json({ ok: true });
  }

  const passedTurnstile = await verifyTurnstile(
    (data.turnstileToken ?? "").trim(),
    ip
  );
  if (!passedTurnstile) {
    return NextResponse.json({ error: "Verification failed" }, { status: 403 });
  }

  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const companyName = (data.companyName ?? "").trim();
  const rawMessage = (data.message ?? "").trim();
  const message =
    rawMessage.length > MESSAGE_MAX ? rawMessage.slice(0, MESSAGE_MAX) : rawMessage;
  const reference = (data.reference ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!isEmailConfigured()) {
    console.error("RESEND_API_KEY is not set; cannot send contact form emails.");
    return NextResponse.json({ error: "Email not configured" }, { status: 500 });
  }

  const firstName = firstNameOf(name);
  const escapedMessage = escapeHtml(message);
  const referenceLine = reference ? `Reference: ${reference}` : "";

  // Internal notification email to the Univarq inbox.
  const notification: EmailPayload = {
    to: CONTACT_ADDRESS,
    reply_to: email,
    subject: `New enquiry from ${name}${companyName ? `, ${companyName}` : ""}`,
    text: [
      `${email}${companyName ? ` · ${companyName}` : ""}`,
      "",
      message,
      referenceLine ? `\n${referenceLine}` : null,
    ]
      .filter((line) => line !== null)
      .join("\n"),
  };

  // Confirmation copy back to the sender.
  const confirmation: EmailPayload = {
    to: email,
    subject: "Your message to Univarq",
    headers: {
      "Auto-Submitted": "auto-generated",
      "X-Auto-Response-Suppress": "All",
    },
    html: `
      <div style="display:none;max-height:0;overflow:hidden">A copy of what you sent us.</div>
      <div style="font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#0B0F14">
        <p style="margin:0 0 16px">Hi ${escapeHtml(firstName)},</p>
        <p style="margin:0 0 16px">Thanks for getting in touch. Your message is with us and a copy is below for your records.</p>
        <blockquote style="border-left:2px solid #C08A3E;margin:0 0 16px;padding-left:16px;color:#4D5966">
          ${
            // Replacement must be a literal string, not a variable, or $&
            // sequences in user input could corrupt the output.
            escapedMessage.replace(/\n/g, "<br>")
          }
        </blockquote>
        <p style="margin:0 0 16px">If you have anything to add, just reply to this email.</p>
        ${referenceLine ? `<p style="margin:0 0 16px;color:#79838F;font-size:13px">${escapeHtml(referenceLine)}</p>` : ""}
        <p style="margin:0">Univarq</p>
      </div>
    `,
    text: `Hi ${firstName},\n\nThanks for getting in touch. Your message is with us and a copy is below for your records.\n\n${message}\n\nIf you have anything to add, just reply to this email.\n${referenceLine ? `\n${referenceLine}\n` : ""}\nUnivarq`,
  };

  try {
    await Promise.all([sendEmail(notification), sendEmail(confirmation)]);
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
