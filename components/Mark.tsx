type MarkProps = {
  size?: number;
  className?: string;
};

/**
 * The Univarq bracket mark, drawn from the exact 64x64 SVG paths in the
 * brand handoff (design_handoff_univarq_brand/README.md). Paper brackets,
 * brass keystone — for use on dark grounds.
 */
export function Mark({ size = 32, className }: MarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10 56V26a10 10 0 0 1 10-10h24"
        stroke="var(--color-paper)"
        strokeWidth={6}
      />
      <path
        d="M54 8v30a10 10 0 0 1-10 10H20"
        stroke="var(--color-paper)"
        strokeWidth={6}
      />
      <rect x={26} y={26} width={12} height={12} fill="var(--color-brass)" />
    </svg>
  );
}
