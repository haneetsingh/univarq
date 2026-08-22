import { Mark } from "./Mark";

export function Footer() {
  return (
    <footer className="border-t border-rule px-6 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Mark size={20} />
          <span className="font-display text-sm font-medium text-paper">
            Univarq
          </span>
        </div>
        <p className="label text-grey">
          Univarq Technologies &mdash; a trade name of 15098742 Canada Inc.
        </p>
        <p className="label text-grey">
          &copy; {new Date().getFullYear()} Univarq Technologies
        </p>
      </div>
    </footer>
  );
}
