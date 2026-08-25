export type FieldName = "name" | "email" | "message";
export type FieldErrors = Partial<Record<FieldName, string>>;
export type Status = "idle" | "submitting" | "success" | "error";

export const MESSAGE_MAX = 1200;

export function validateField(name: FieldName, value: string): string | undefined {
  const trimmed = value.trim();
  if (name === "name" && !trimmed) return "Tell us your name.";
  if (name === "email") {
    if (!trimmed) return "We need an email to reply to.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
      return "That email address does not look right.";
    }
  }
  if (name === "message") {
    if (!trimmed) return "A sentence or two about the problem is enough.";
    if (trimmed.length < 12) return "A little more detail helps us reply usefully.";
  }
  return undefined;
}

export function referenceId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 5; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `UVQ-${suffix}`;
}

export type SuccessInfo = {
  name: string;
  email: string;
  reference: string;
};
