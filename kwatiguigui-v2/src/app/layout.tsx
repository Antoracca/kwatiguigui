import type { Metadata, Viewport } from "next";

import { Providers } from "@/components/providers";
import { inter, plusJakarta, jetbrainsMono } from "@/lib/fonts";

import "@/styles/globals.css";

// ---------------------------------------------------------------------------
// Global metadata — every page inherits and can override
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://kwatiguigui.org",
  ),
  title: {
    default: "KWATIGUIGUI - Premiere plateforme d'emploi de la RCA",
    template: "%s | KWATIGUIGUI",
  },
  description:
    "Trouvez un emploi ou recrutez en Republique Centrafricaine. KWATIGUIGUI connecte employeurs et chercheurs d'emploi dans les 20 regions du pays.",
  keywords: [
    "emploi",
    "travail",
    "Centrafrique",
    "RCA",
    "Bangui",
    "recrutement",
    "offre d'emploi",
    "chercheur d'emploi",
    "KWATIGUIGUI",
    "Republique Centrafricaine",
  ],
  authors: [{ name: "KWATIGUIGUI" }],
  creator: "KWATIGUIGUI",
  publisher: "KWATIGUIGUI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://kwatiguigui.org",
    siteName: "KWATIGUIGUI",
    title: "KWATIGUIGUI - Premiere plateforme d'emploi de la RCA",
    description:
      "Trouvez un emploi ou recrutez en Republique Centrafricaine. KWATIGUIGUI connecte employeurs et chercheurs d'emploi dans les 20 regions du pays.",
    images: [
      {
        url: "/images/og-default.png",
        width: 1200,
        height: 630,
        alt: "KWATIGUIGUI - Plateforme d'emploi RCA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KWATIGUIGUI - Premiere plateforme d'emploi de la RCA",
    description:
      "Trouvez un emploi ou recrutez en Republique Centrafricaine.",
    images: ["/images/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/Favicon.png",
    shortcut: "/images/Favicon.png",
    apple: "/images/Favicon.png",
  },
  manifest: "/favicon/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#003189" },
    { media: "(prefers-color-scheme: dark)", color: "#0F172A" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ---------------------------------------------------------------------------
// Root Layout
// ---------------------------------------------------------------------------
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${inter.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-background font-body text-foreground antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
