import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  title:
    "Univarq Technologies. Build, embed or modernize. Software engineering partner",
  description:
    "Univarq takes ownership of complex technology initiatives. We come in as a build partner, an embedded team or a modernization partner, whichever the problem calls for.",
  icons: {
    icon: [
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/brand/favicon-180.png" }],
  },
  openGraph: {
    title: "Univarq Technologies. One team. Every layer of the stack.",
    description:
      "An engineering partner that takes ownership of complex technology initiatives. Build, embed or modernize.",
    url: "https://univarq.io",
    siteName: "Univarq",
    images: [{ url: "/brand/og-univarq-1200x630.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Univarq Technologies. One team. Every layer of the stack.",
    description:
      "An engineering partner that takes ownership of complex technology initiatives. Build, embed or modernize.",
    images: ["/brand/og-univarq-1200x630.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-paper">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
