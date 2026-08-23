export function ErrorIcon({ small }: { small?: boolean }) {
  const size = small ? 15 : 16;
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      className="mt-[2px] flex-none"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6.75" stroke="var(--color-error)" strokeWidth="1.5" />
      <path d="M8 4.75v4.5" stroke="var(--color-error)" strokeWidth="1.5" />
      <circle cx="8" cy="11.4" r="0.9" fill="var(--color-error)" />
    </svg>
  );
}
