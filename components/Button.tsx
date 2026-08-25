import type { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import { Spinner } from "./icons/Spinner";

type Variant = "primary" | "secondary" | "icon";
type Size = "sm" | "md" | "lg" | "icon";
type IconPosition = "left" | "right";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-brass text-ink transition-colors hover:bg-brass-hover",
  secondary:
    "border border-rule-strong text-paper transition-colors hover:border-brass",
  icon:
    "border border-rule-strong text-paper transition-colors hover:border-brass",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "px-4.5 py-3.5 text-[13.5px] font-medium",
  md: "px-6.5 py-4.5 text-sm font-medium",
  lg: "text-[15px] font-medium",
  icon: "h-12 w-12",
};

const SIZE_STYLE: Partial<Record<Size, { minHeight: number }>> = {
  lg: { minHeight: 52 },
};

const BASE_CLASSES = "inline-flex shrink-0 items-center justify-center gap-2.75";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  loading?: boolean;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  icon?: ReactNode;
  iconPosition?: IconPosition;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    as?: "button";
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
  loading,
  className,
  style,
  icon,
  iconPosition = "left",
  children,
  ...rest
}: ButtonProps) {
  const iconOnly = variant === "icon";

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

  const mergedStyle = { ...SIZE_STYLE[size], ...style };

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
      <a className={classes} style={mergedStyle} {...anchorProps}>
        {content}
      </a>
    );
  }

  const { as, disabled, ...buttonProps } = rest;
  void as;
  return (
    <button
      className={classes}
      style={mergedStyle}
      disabled={disabled || loading}
      {...buttonProps}
    >
      {content}
    </button>
  );
}
