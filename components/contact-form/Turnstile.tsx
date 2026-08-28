"use client";

import { useEffect, useRef, type RefObject } from "react";

const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
const ACTION = "contact";

/** Whether the Turnstile widget is configured and should render. */
export const turnstileEnabled = SITE_KEY.length > 0;

type TurnstileApi = {
  render: (
    el: HTMLElement,
    options: {
      sitekey: string;
      action?: string;
      theme?: "light" | "dark" | "auto";
      callback: (token: string) => void;
      "expired-callback"?: () => void;
      "error-callback"?: () => void;
    }
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
    onTurnstileLoad?: () => void;
  }
}

let scriptPromise: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    window.onTurnstileLoad = () => resolve();
    const script = document.createElement("script");
    script.src = `${SCRIPT_SRC}&onload=onTurnstileLoad`;
    script.async = true;
    script.defer = true;
    script.onerror = () => reject(new Error("Failed to load Turnstile"));
    document.head.appendChild(script);
  });

  return scriptPromise;
}

type TurnstileProps = {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  /** Bump this to force a widget reset (e.g. after a failed submit). */
  resetKey?: number;
  /** Focus target when the user submits without completing the check. */
  ref?: RefObject<HTMLDivElement | null>;
};

export function Turnstile({
  onVerify,
  onExpire,
  resetKey = 0,
  ref,
}: TurnstileProps) {
  const localRef = useRef<HTMLDivElement>(null);
  const containerRef = ref ?? localRef;
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!turnstileEnabled || !containerRef.current) return;
    const container = containerRef.current;
    let cancelled = false;

    loadScript()
      .then(() => {
        if (cancelled || !window.turnstile) return;
        widgetIdRef.current = window.turnstile.render(container, {
          sitekey: SITE_KEY,
          action: ACTION,
          theme: "auto",
          callback: onVerify,
          "expired-callback": () => onExpire?.(),
          "error-callback": () => onExpire?.(),
        });
      })
      .catch(() => {
        // Script blocked or offline. The server still rejects a missing token,
        // so fail closed rather than letting the form submit without one.
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (resetKey > 0 && widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, [resetKey]);

  if (!turnstileEnabled) return null;

  return <div ref={containerRef} tabIndex={-1} className="min-h-16.25 outline-none" />;
}
