# Univarq site

Marketing site for Univarq — a single-page homepage built with Next.js 16 (App Router),
React 19, and Tailwind CSS 4.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description                       |
| --------------- | --------------------------------- |
| `npm run dev`   | Start the development server      |
| `npm run build` | Production build                  |
| `npm run start` | Serve the production build        |
| `npm run lint`  | Run ESLint                        |

## Project layout

```
app/                 App Router entry
  layout.tsx         Root layout, fonts, metadata
  page.tsx           Homepage, composes the section components
  globals.css        Tailwind + design tokens
  robots.ts          robots.txt
  sitemap.ts         sitemap.xml
  api/contact/       Contact form submission endpoint
components/          Homepage sections (Hero, Services, Contact, ...)
  contact-form/      Contact form fields, Turnstile, submit handling
  icons/             Inline SVG icons
content/
  homepage.json      All homepage copy
lib/
  email.ts           Resend transactional email
  posthog-server.ts  Server-side PostHog client
  utils.ts           Rate limiting, IP parsing, HTML escaping
```

Homepage copy lives in `content/homepage.json` — edit there, not in the components.

## Environment variables

Copy `.env.example` to `.env.local` for local dev; set the same keys in the Vercel
project settings for deploys.

| Variable                            | Required | Purpose                                                             |
| ----------------------------------- | -------- | ------------------------------------------------------------------ |
| `RESEND_API_KEY`                    | yes\*    | Sends contact-form notification and confirmation emails             |
| `NEXT_PUBLIC_CONTACT_EMAIL`         | no       | Mailbox that sends/receives contact mail (default `info@univarq.io`) |
| `NEXT_PUBLIC_CONTACT_NAME`          | no       | Display name on outgoing email (default `Univarq`)                  |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`    | no       | Turnstile widget sitekey; widget is hidden and the check is skipped if unset |
| `TURNSTILE_SECRET`                  | no       | Cloudflare Turnstile secret (set together with the sitekey)         |
| `TURNSTILE_HOSTNAMES`               | no       | Comma-separated allowed hostnames for Turnstile verification        |
| `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` | no\*\*   | PostHog project token for client and server analytics              |
| `NEXT_PUBLIC_POSTHOG_HOST`          | no       | PostHog host for server-side events                                 |

\* The contact form returns a 500 if `RESEND_API_KEY` is missing; everything else runs without it.
\*\* Optional in production, but the app throws on startup in non-production if it is missing.

## Analytics

- **Vercel Web Analytics** via `@vercel/analytics`.
- **PostHog** — client events through the `/ingest` rewrite proxy configured in
  `next.config.ts`; server events (e.g. `contact_received`) via `lib/posthog-server.ts`.

## Deployment

Deploys to Vercel. Push to the default branch for production; pull requests get preview URLs.
