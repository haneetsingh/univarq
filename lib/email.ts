// Transactional email delivery via Resend.

const RESEND_API_URL = "https://api.resend.com/emails";

const FROM_NAME = process.env.NEXT_PUBLIC_CONTACT_NAME ?? "Univarq";

// The mailbox that sends and receives contact mail.
export const CONTACT_ADDRESS =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@univarq.io";

export const FROM_ADDRESS = `${FROM_NAME} <${CONTACT_ADDRESS}>`;

export type EmailPayload = {
  to: string;
  subject: string;
  text: string;
  from?: string;
  html?: string;
  reply_to?: string;
  headers?: Record<string, string>;
};

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

export async function sendEmail(payload: EmailPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM_ADDRESS, ...payload }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Resend request failed (${response.status}): ${text}`);
  }
}
