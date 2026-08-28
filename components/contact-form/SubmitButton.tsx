import { Button } from "../Button";
import content from "@/content/homepage.json";

const { site } = content;

export function SubmitButton({ submitting }: { submitting: boolean }) {
  return (
    <div className="pt-1">
      <Button type="submit" size="lg" fullWidth loading={submitting}>
        {submitting ? "Sending…" : site.formCta}
      </Button>
    </div>
  );
}
