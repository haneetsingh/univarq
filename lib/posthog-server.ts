import { PostHog } from "posthog-node";

let posthogClient: PostHog | null = null;

export function getPostHogClient(): PostHog {
  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (!token) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is missing or un-configured; " +
          "server-side PostHog events will be dropped."
      );
    }
    // No-op stub so callers never crash without a token.
    return {
      capture: () => {},
      identify: () => {},
      flush: async () => {},
      shutdown: async () => {},
    } as unknown as PostHog;
  }

  if (!posthogClient) {
    posthogClient = new PostHog(token, {
      host,
      flushAt: 1,
      flushInterval: 0,
    });
  }

  return posthogClient;
}
