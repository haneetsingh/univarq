import { ErrorIcon } from "../icons/ErrorIcon";

type ErrorBannerProps = {
  networkError: boolean;
  invalidCount: number;
};

function summaryText(invalidCount: number) {
  if (invalidCount <= 1) return "One field needs attention.";
  return `${invalidCount} fields need attention.`;
}

export function ErrorBanner({ networkError, invalidCount }: ErrorBannerProps) {
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
        <span className="text-[13.5px] leading-snug" style={{ color: "var(--color-error-summary)" }}>
          {networkError
            ? "Your message is still here. Try again, or email info@univarq.io."
            : summaryText(invalidCount)}
        </span>
      </div>
    </div>
  );
}
