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

// Server-issued correlation code, shown to the sender and logged. Not looked up.
function makeReference(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 5; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `UVQ-${suffix}`;
}

const rateLimit = createRateLimiter(5, 10 * 60 * 1000);

const TURNSTILE_ACTION = "contact";
const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

// Best-effort PostHog event for broken/missing server config. Never throws.
function reportMisconfiguration(
  problem: string,
  properties: Record<string, unknown> = {}
): void {
  console.error(`Contact form misconfiguration: ${problem}`, properties);
  try {
    const posthog = getPostHogClient();
    posthog.capture({
      distinctId: `config-${problem}`,
      event: "contact_misconfigured",
      properties: { problem, ...properties },
    });
    void posthog.flush().catch(() => {});
  } catch {}
}

type ContactSubmission = {
  name?: string;
  email?: string;
  companyName?: string;
  message?: string;
  honeypot?: string;
  turnstileToken?: string;
};

// Verify a Cloudflare Turnstile token. Returns true when Turnstile is not
// configured, so the form still works without it.
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) {
    // Fail open, but a missing secret in production is a real problem.
    if (process.env.NODE_ENV === "production") {
      reportMisconfiguration("turnstile_secret_missing");
    }
    return true;
  }

  const expectedHostnames = new Set(
    (process.env.TURNSTILE_HOSTNAMES ?? "")
      .split(",")
      .map((h) => h.trim())
      .filter(Boolean)
  );

  if (expectedHostnames.size === 0) {
    // Secret set but no hostname allowlist: every submission would be rejected.
    reportMisconfiguration("turnstile_hostnames_missing");
    return false;
  }

  if (!token || token.length > 2048) {
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
    // siteverify unreachable or erroring — a bad secret or an outage, not the user.
    reportMisconfiguration("turnstile_siteverify_failed", {
      error: err instanceof Error ? err.message : String(err),
    });
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
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) {
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
  const reference = makeReference();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!isEmailConfigured()) {
    reportMisconfiguration("resend_api_key_missing");
    return NextResponse.json({ error: "Email not configured" }, { status: 500 });
  }

  const firstName = firstNameOf(name);
  const escapedMessage = escapeHtml(message);
  const referenceLine = `Reference: ${reference}`;

  // Internal notification email to the Univarq inbox.
  const notification: EmailPayload = {
    to: CONTACT_ADDRESS,
    reply_to: email,
    subject: `New enquiry from ${name}${companyName ? `, ${companyName}` : ""}`,
    text: [
      `${email}${companyName ? ` · ${companyName}` : ""}`,
      "",
      message,
      "",
      referenceLine,
    ].join("\n"),
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
        <p style="margin:0 0 16px;color:#79838F;font-size:13px">${escapeHtml(referenceLine)}</p>
        <p style="margin:0">Univarq</p>
      </div>
    `,
    text: `Hi ${firstName},\n\nThanks for getting in touch. Your message is with us and a copy is below for your records.\n\n${message}\n\nIf you have anything to add, just reply to this email.\n\n${referenceLine}\n\nUnivarq`,
  };

  // Only the notification must succeed; a failed confirmation copy is tolerable.
  const [notified, confirmed] = await Promise.allSettled([
    sendEmail(notification),
    sendEmail(confirmation),
  ]);

  if (notified.status === "rejected") {
    reportMisconfiguration("resend_send_failed", {
      error: String(notified.reason),
      which: "notification",
    });
    return NextResponse.json({ error: "Failed to send" }, { status: 502 });
  }

  if (confirmed.status === "rejected") {
    reportMisconfiguration("confirmation_send_failed", {
      error: String(confirmed.reason),
    });
  }

  // Best-effort: the emails are already sent, analytics must not fail the request.
  try {
    const posthog = getPostHogClient();
    posthog.capture({
      distinctId: request.headers.get("x-posthog-distinct-id") || `anon-${ip}`,
      event: "contact_received",
      properties: {
        has_company: Boolean(companyName),
        message_length: message.length,
        reference,
        confirmation_sent: confirmed.status === "fulfilled",
        posthog_session_id:
          request.headers.get("x-posthog-session-id") || undefined,
      },
    });
    await posthog.flush();
  } catch (error) {
    console.error("Failed to record contact_received event", error);
  }

  return NextResponse.json({ ok: true, reference });
}
