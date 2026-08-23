import { ErrorIcon } from "../icons/ErrorIcon";

type ErrorBannerProps = {
  networkError: boolean;
  invalidCount: number;
};

function summaryText(invalidCount: number) {
  if (invalidCount <= 1) return "That needs a second look";
  return `${invalidCount} fields need attention`;
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
        <span className="text-[15px] font-medium text-paper">
          {networkError ? "Couldn't reach us" : summaryText(invalidCount)}
        </span>
        <span className="text-[13.5px] leading-snug text-body">
          {networkError
            ? "Your message is still here. Try again, or email info@univarq.io."
            : "Nothing was sent. Fix the highlighted fields and try again."}
        </span>
      </div>
    </div>
  );
}
