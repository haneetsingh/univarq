import type { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import { Spinner } from "./icons/Spinner";

type Variant = "primary" | "secondary" | "icon";
type Size = "sm" | "md" | "lg" | "icon";
type IconPosition = "left" | "right";

// enabled:/disabled: are no-ops on <a>.
const OUTLINE =
  "border border-rule-strong text-paper transition-colors enabled:hover:border-brass disabled:opacity-55";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-brass text-ink transition-colors enabled:hover:bg-brass-hover disabled:opacity-55",
  secondary: OUTLINE,
  icon: OUTLINE,
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "px-4.5 py-3.5 text-[13.5px] font-medium",
  md: "px-6.5 py-4.5 text-sm font-medium",
  lg: "min-h-13 px-7 text-[15px] font-medium",
  icon: "h-12 w-12",
};

const BASE_CLASSES = "inline-flex shrink-0 items-center justify-center gap-2.75";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  icon?: ReactNode;
  iconPosition?: IconPosition;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps | "loading"> & {
    as?: "button";
    loading?: boolean; // button only
  };

type ButtonAsAnchor = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    as: "a";
  };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Button({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
  style,
  icon,
  iconPosition = "left",
  children,
  ...rest
}: ButtonProps) {
  const iconOnly = variant === "icon";
  const loading = rest.as === "a" ? false : rest.loading;

  const classes = [
    BASE_CLASSES,
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[iconOnly ? "icon" : size],
    fullWidth && !iconOnly ? "w-full" : "",
    loading ? "cursor-not-allowed" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const content = iconOnly ? (
    <>
      {icon}
      <span className="sr-only">{children}</span>
    </>
  ) : (
    <>
      {loading && <Spinner />}
      {!loading && icon && iconPosition === "left" && icon}
      {children}
      {!loading && icon && iconPosition === "right" && icon}
    </>
  );

  if (rest.as === "a") {
    const { as, ...anchorProps } = rest;
    void as;
    return (
      <a className={classes} style={style} {...anchorProps}>
        {content}
      </a>
    );
  }

  const { as, disabled, loading: _loading, ...buttonProps } = rest;
  void as;
  void _loading;
  return (
    <button
      className={classes}
      style={style}
      disabled={disabled || loading}
      {...buttonProps}
    >
      {content}
    </button>
  );
}
