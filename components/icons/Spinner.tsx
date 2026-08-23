export function Spinner() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="15"
      height="15"
      fill="none"
      className="motion-safe:animate-spin"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6.5" stroke="rgba(11,15,20,0.3)" strokeWidth="2" />
      <path d="M8 1.5a6.5 6.5 0 0 1 6.5 6.5" stroke="var(--color-ink)" strokeWidth="2" />
    </svg>
  );
}
