import { Spinner } from "../icons/Spinner";
import content from "@/content/homepage.json";

const { site, contact } = content;

export function SubmitButton({ submitting }: { submitting: boolean }) {
  return (
    <div className="flex flex-col gap-3.5 pt-1">
      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2.75 text-[15px] font-medium text-ink disabled:cursor-not-allowed"
        style={{
          background: submitting ? "#8f6730" : "var(--color-brass)",
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
        {submitting ? "Sending…" : site.ctaLabel}
      </button>
      <p className="text-[14px]" style={{ color: "var(--color-faint)" }}>
        {contact.responseNote}
      </p>
    </div>
  );
}
