import { createHash } from "node:crypto";
import { getPostHogClient } from "@/lib/posthog-server";
import { clientIp } from "@/lib/utils";

const LLMS_TXT = `# Univarq Technologies

> Univarq is a small software engineering and consulting practice that takes direct ownership of complex technology initiatives across the full stack — application, data and cloud. Every engagement runs as one of three models, agreed before the work starts: Build, Embed or Modernize. The engineers who scope the work build it and stay involved through production. There is no account manager between the problem and the people solving it.

## Engagement models

- **Build**: You have a problem. We build the solution. From a new application to a complete platform, Univarq takes ownership from architecture through production.
- **Embed**: Add engineering capacity without adding layers. We work directly inside your engineering organization to solve hard problems, accelerate delivery and fill critical technical gaps.
- **Modernize**: Make existing systems ready for what comes next. Modernize legacy applications, architectures and infrastructure without forcing unnecessary rewrites.

The engagement model is agreed up front. The work finishes in production — when the system runs and the team that owns it can operate it, with architecture decisions written down. Univarq is small by design and takes on a few engagements at a time.

## Solutions

- **Business Applications**: Customer portals, internal platforms, operational systems and enterprise applications.
- **Digital Platforms**: Web platforms and products designed to grow.
- **Data & AI Solutions**: Data pipelines, intelligent workflows, AI-enabled products and automation.
- **Cloud & Platform Engineering**: Cloud architecture, infrastructure, deployment pipelines and platform modernization.
- **Integrations**: APIs, third-party integrations and systems that need to work together.

Technology is chosen based on the problem, not the other way around.

## Industries

Insurance; Banking & Financial Services; Supply Chain & Logistics; Enterprise Technology; Healthcare & Life Sciences; Real Estate & Construction; Manufacturing & Industrial; Professional Services.

## Technology

- Frontend: React, Next.js, Angular, TypeScript
- Backend: Node.js, Python, APIs, GraphQL
- Cloud & Platform: AWS, Azure, cloud infrastructure, CI/CD
- Data: PostgreSQL, MongoDB, data pipelines
- AI: AI integration, intelligent workflows, automation

## How we work

1. Understand — start with the problem, not the technology.
2. Architect — define the technical approach, scope and path to production.
3. Build — the same team designs and builds the solution.
4. Ship — take the solution through testing, deployment and production.
5. Improve — stay involved where needed and keep improving what was built.

## Pricing

Most work is scoped either as a fixed-scope project with a defined path to production, or as an ongoing monthly engagement. Which one fits depends on the problem and is worked out on an initial call. Univarq works with both startups and larger companies.

## Contact

- Website: https://univarq.io
- Email: info@univarq.io
- LinkedIn: https://www.linkedin.com/company/univarq/
- Contact form: https://univarq.io/#contact
`;

// Stable-ish anonymous id: hash of IP + user-agent so repeat fetches from the
// same client group, without identifying anyone. Falls back to a fixed id.
function anonymousId(ip: string, userAgent: string): string {
  if (ip === "unknown" && !userAgent) return "llms-txt-anonymous";
  return `llms-txt-${createHash("sha256")
    .update(`${ip}|${userAgent}`)
    .digest("hex")
    .slice(0, 32)}`;
}

export async function GET(request: Request) {
  const userAgent = request.headers.get("user-agent") ?? "";
  const referer = request.headers.get("referer") ?? "";

  try {
    const posthog = getPostHogClient();
    posthog.capture({
      distinctId: anonymousId(clientIp(request), userAgent),
      event: "llms_txt_fetched",
      properties: {
        userAgent,
        referer,
        path: "/llms.txt",
        timestamp: new Date().toISOString(),
      },
    });
    await posthog.flush();
  } catch (error) {
    console.error("Failed to record llms_txt_fetched event", error);
  }

  return new Response(LLMS_TXT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
