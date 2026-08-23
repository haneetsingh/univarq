import { Mark } from "./Mark";

export function Footer() {
  return (
    <footer className="border-t border-rule px-6 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Mark size={20} />
          <span className="font-display text-sm font-medium text-paper">
            Univarq
          </span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
          <a
            href="mailto:info@univarq.io"
            className="label text-grey transition-colors hover:text-paper"
          >
            info@univarq.io
          </a>
          <a
            href="https://linkedin.com/company/univarq"
            target="_blank"
            rel="noopener noreferrer"
            className="label text-grey transition-colors hover:text-paper"
          >
            LinkedIn
          </a>
          <span className="label text-grey">Ontario, Canada</span>
        </div>

        <p className="label text-grey">
          &copy; {new Date().getFullYear()} Univarq Technologies
        </p>
      </div>
    </footer>
  );
}
