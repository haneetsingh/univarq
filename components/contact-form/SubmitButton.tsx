import { ClockIcon } from "../icons/ClockIcon";
import { Spinner } from "../icons/Spinner";

export function SubmitButton({ submitting }: { submitting: boolean }) {
  return (
    <div className="flex flex-col gap-4 pt-1">
      <button
        type="submit"
        disabled={submitting}
        className="flex w-fit items-center gap-2.75 text-[16px] font-medium text-ink disabled:cursor-not-allowed"
        style={{
          background: submitting ? "#8f6730" : "var(--color-brass)",
          padding: "17px 34px",
          minHeight: 52,
        }}
        onMouseEnter={(e) => {
          if (!submitting) e.currentTarget.style.background = "var(--color-brass-hover)";
        }}
        onMouseLeave={(e) => {
          if (!submitting) e.currentTarget.style.background = "var(--color-brass)";
        }}
      >
        {submitting && <Spinner />}
        {submitting ? "Sending…" : "Send"}
      </button>
      <div className="flex items-center gap-2.25 text-[13.5px] text-grey">
        <ClockIcon />
        <span>We reply within one business day. No sales sequence.</span>
      </div>
    </div>
  );
}
