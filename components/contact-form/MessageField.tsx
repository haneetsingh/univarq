import type { ChangeEvent, FocusEvent } from "react";
import { MESSAGE_MAX } from "./utils";
import { FieldError } from "./Field";

type MessageFieldProps = {
  disabled?: boolean;
  error?: string;
  messageLength: number;
  onBlur: (event: FocusEvent<HTMLTextAreaElement>) => void;
  onMessageChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

export function MessageField({
  disabled,
  error,
  messageLength,
  onBlur,
  onMessageChange,
}: MessageFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <label htmlFor="message" className="label text-grey">
          What are you trying to build? <span style={{ color: "var(--color-brass)" }}>*</span>
        </label>
        <span
          className="label"
          style={{ color: error ? "var(--color-error)" : "var(--color-placeholder)" }}
        >
          {messageLength} / {MESSAGE_MAX}
        </span>
      </div>
      <textarea
        id="message"
        name="message"
        rows={6}
        required
        disabled={disabled}
        maxLength={MESSAGE_MAX}
        placeholder="A new build, an embedded team or a system that needs modernizing."
        aria-invalid={Boolean(error)}
        aria-describedby={error ? "message-error" : undefined}
        onBlur={onBlur}
        onChange={onMessageChange}
        className="resize-y px-4 py-3.5 text-[15.5px] text-paper transition-colors disabled:opacity-55"
        style={{
          background: error ? "var(--color-error-field-bg)" : "var(--color-ink)",
          border: `1px solid ${error ? "var(--color-error)" : "var(--color-input-border)"}`,
          outline: "none",
          minHeight: 132,
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
      {error && <FieldError id="message-error">{error}</FieldError>}
    </div>
  );
}
