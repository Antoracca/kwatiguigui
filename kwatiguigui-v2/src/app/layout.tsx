import type { Metadata, Viewport } from "next";
import Script from "next/script";

import { Providers } from "@/components/providers";
import { inter, plusJakarta, jetbrainsMono } from "@/lib/fonts";

import "@/styles/globals.css";

// ---------------------------------------------------------------------------
// Global metadata — every page inherits and can override
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://kussala.org",
  ),
  title: {
    default: "KUSSALA - Premiere plateforme d'emploi de la RCA",
    template: "%s | KUSSALA",
  },
  description:
    "Trouvez un emploi ou recrutez en Republique Centrafricaine. KUSSALA connecte employeurs et chercheurs d'emploi dans les 20 regions du pays.",
  keywords: [
    "emploi",
    "travail",
    "Centrafrique",
    "RCA",
    "Bangui",
    "recrutement",
    "offre d'emploi",
    "chercheur d'emploi",
    "KUSSALA",
    "Republique Centrafricaine",
  ],
  authors: [{ name: "KUSSALA" }],
  creator: "KUSSALA",
  publisher: "KUSSALA",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://kussala.org",
    siteName: "KUSSALA",
    title: "KUSSALA - Premiere plateforme d'emploi de la RCA",
    description:
      "Trouvez un emploi ou recrutez en Republique Centrafricaine. KUSSALA connecte employeurs et chercheurs d'emploi dans les 20 regions du pays.",
    images: [
      {
        url: "/images/og-default.png",
        width: 1200,
        height: 630,
        alt: "KUSSALA - Plateforme d'emploi RCA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KUSSALA - Premiere plateforme d'emploi de la RCA",
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
  // Comportement "application" : on bloque le zoom (notamment le zoom auto
  // d'iOS au focus d'un input). Combiné avec les champs à 16px (globals.css),
  // l'écran ne zoome plus jamais sur les inputs.
  maximumScale: 1,
  userScalable: false,
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
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "x08btfhaoo");
            `,
          }}
        />
      </body>
    </html>
  );
}
