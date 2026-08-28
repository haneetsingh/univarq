import { ErrorIcon } from "../icons/ErrorIcon";
import { CONTACT_ADDRESS } from "@/lib/email";
import type { ErrorReason } from "./utils";

type ErrorBannerProps = {
  reason: ErrorReason;
  invalidCount: number;
};

function validationText(invalidCount: number) {
  if (invalidCount <= 1) return "One field needs attention.";
  return `${invalidCount} fields need attention.`;
}

export function ErrorBanner({ reason, invalidCount }: ErrorBannerProps) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 border px-4.5 py-4"
      style={{
        background: "var(--color-error-bg)",
        borderColor: "var(--color-error-border)",
      }}
    >
      <ErrorIcon />
      <div className="flex flex-col gap-1">
        <span className="text-[15px] font-medium text-paper">Nothing was sent.</span>
        <span className="text-[13.5px] leading-snug text-error-summary">
          {reason === "network" ? (
            <>
              Your message is still here. Try again or email{" "}
              <a
                href={`mailto:${CONTACT_ADDRESS}`}
                className="text-error-summary underline decoration-error-summary/50 underline-offset-4 transition-colors hover:text-paper hover:decoration-paper"
              >
                {CONTACT_ADDRESS}
              </a>
              .
            </>
          ) : reason === "verification" ? (
            "Complete the verification check below, then send again."
          ) : (
            validationText(invalidCount)
          )}
        </span>
      </div>
    </div>
  );
}
