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
        {label} {required && <span className="text-brass">*</span>}
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
        className="min-h-12 border border-input-border bg-ink px-4 text-[15.5px] text-paper
          transition-colors outline-none
          focus:border-focus focus:shadow-[0_0_0_2px_rgba(47,86,134,0.35)]
          aria-invalid:border-error aria-invalid:bg-error-field-bg
          aria-invalid:focus:shadow-[0_0_0_2px_rgba(196,84,74,0.35)]
          disabled:opacity-55"
      />
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </div>
  );
}

export function FieldError({ id, children }: { id: string; children: string }) {
  return (
    <div
      id={id}
      className="flex items-start gap-2 text-[13.5px] leading-snug text-error"
    >
      <ErrorIcon small />
      <span>{children}</span>
    </div>
  );
}
