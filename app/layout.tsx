import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import content from "@/content/homepage.json";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://univarq.io"),
  title: "Univarq — Software engineering partner | Build, embed, modernize",
  description:
    "Univarq takes ownership of complex technology initiatives. We come in as a build partner, an embedded team or a modernization partner, whichever the problem calls for.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/brand/favicon-180.png" }],
  },
  openGraph: {
    title: "Univarq — Software engineering partner | Build, embed, modernize",
    description:
      "An engineering partner that takes ownership of complex technology initiatives. Build, embed or modernize.",
    url: "https://univarq.io",
    siteName: "Univarq",
    images: [
      {
        url: "/brand/og-univarq-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Univarq — Software engineering partner | Build, embed, modernize",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Univarq — Software engineering partner | Build, embed, modernize",
    description:
      "An engineering partner that takes ownership of complex technology initiatives. Build, embed or modernize.",
    images: ["/brand/og-univarq-1200x630.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Univarq Technologies",
      url: "https://univarq.io",
      logo: "https://univarq.io/brand/univarq-mark-dark-bg.svg",
      image: "https://univarq.io/brand/og-univarq-1200x630.png",
      description:
        "Univarq takes ownership of complex technology initiatives. We come in as a build partner, an embedded team or a modernization partner, whichever the problem calls for.",
      email: "info@univarq.io",
      sameAs: ["https://www.linkedin.com/company/univarq/"],
      contactPoint: {
        "@type": "ContactPoint",
        email: "info@univarq.io",
        contactType: "sales",
        url: "https://univarq.io/#contact",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Engagement models",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Build",
              description:
                "You have a problem. We build the solution. From a new application to a complete platform, Univarq takes ownership from architecture through production.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Embed",
              description:
                "Add engineering capacity without adding layers. Work directly with the engineering organization to solve hard problems, accelerate delivery and fill critical technical gaps.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Modernize",
              description:
                "Make existing systems ready for what comes next. Modernize legacy applications, architectures and infrastructure without forcing unnecessary rewrites.",
            },
          },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: content.faq.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-paper">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
