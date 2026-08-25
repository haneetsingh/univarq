import { Button } from "../Button";
import content from "@/content/homepage.json";

const { site, contact } = content;

export function SubmitButton({ submitting }: { submitting: boolean }) {
  return (
    <div className="flex flex-col gap-3.5 pt-1">
      <Button type="submit" size="lg" fullWidth loading={submitting}>
        {submitting ? "Sending…" : site.formCta}
      </Button>
      <p className="text-[14px]" style={{ color: "var(--color-faint)" }}>
        {contact.responseNote}
      </p>
    </div>
  );
}
