export type FieldName = "name" | "email" | "message";
export type FieldErrors = Partial<Record<FieldName, string>>;
export type Status = "idle" | "submitting" | "success" | "error";

export const MESSAGE_MAX = 1200;

export function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
}

export function validateField(name: FieldName, value: string): string | undefined {
  const trimmed = value.trim();
  if (name === "name" && !trimmed) return "Enter your name.";
  if (name === "email") {
    if (!trimmed) return "Enter a work email.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return "Enter a complete email address.";
    }
  }
  if (name === "message" && trimmed.length < 8) {
    return "Tell us a sentence or two about the problem.";
  }
  return undefined;
}

export function referenceId() {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `UVQ-${yy}${mm}-${suffix}`;
}

export type SuccessInfo = {
  name: string;
  email: string;
  reference: string;
};
