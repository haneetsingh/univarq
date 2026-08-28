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
          What are you trying to build? <span className="text-brass">*</span>
        </label>
        <span className={`label ${error ? "text-error" : "text-placeholder"}`}>
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
        placeholder="The problem, the system it touches and your rough timeline."
        aria-invalid={Boolean(error)}
        aria-describedby={error ? "message-error" : undefined}
        onBlur={onBlur}
        onChange={onMessageChange}
        className="min-h-33 resize-y border border-input-border bg-ink px-4 py-3.5 text-[15.5px] text-paper
          transition-colors outline-none
          focus:border-focus focus:shadow-[0_0_0_2px_rgba(47,86,134,0.35)]
          aria-invalid:border-error aria-invalid:bg-error-field-bg
          aria-invalid:focus:shadow-[0_0_0_2px_rgba(196,84,74,0.35)]
          disabled:opacity-55"
      />
      {error && <FieldError id="message-error">{error}</FieldError>}
    </div>
  );
}
