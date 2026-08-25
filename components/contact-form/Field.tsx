import type { FocusEvent, ReactNode } from "react";
import type { FieldName } from "./utils";
import { ErrorIcon } from "../icons/ErrorIcon";

type FieldProps = {
  id: string;
  name: FieldName | "companyName";
  label: string;
  labelSuffix?: ReactNode;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onChange?: () => void;
};

export function Field({
  id,
  name,
  label,
  labelSuffix,
  type = "text",
  required,
  disabled,
  error,
  placeholder,
  autoComplete,
  onBlur,
  onChange,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="label text-grey">
        {label} {required && <span style={{ color: "var(--color-brass)" }}>*</span>}
        {labelSuffix ? <> {labelSuffix}</> : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onBlur={onBlur}
        onChange={onChange}
        className="px-4 text-[15.5px] text-paper transition-colors disabled:opacity-55"
        style={{
          background: error ? "var(--color-error-field-bg)" : "var(--color-ink)",
          border: `1px solid ${error ? "var(--color-error)" : "var(--color-input-border)"}`,
          minHeight: 48,
          outline: "none",
        }}
        onFocus={(e) => {
          const ringColor = error ? "196,84,74" : "47,86,134";
          e.currentTarget.style.borderColor = error ? "var(--color-error)" : "var(--color-focus)";
          e.currentTarget.style.boxShadow = `0 0 0 2px rgba(${ringColor},0.35)`;
        }}
        onBlurCapture={(e) => {
          e.currentTarget.style.boxShadow = "none";
        }}
      />
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </div>
  );
}

export function FieldError({ id, children }: { id: string; children: string }) {
  return (
    <div
      id={id}
      className="flex items-start gap-2 text-[13.5px] leading-snug"
      style={{ color: "var(--color-error)" }}
    >
      <ErrorIcon small />
      <span>{children}</span>
    </div>
  );
}
