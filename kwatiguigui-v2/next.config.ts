import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

function buildContentSecurityPolicy() {
  const directives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' 'wasm-unsafe-eval' https://unpkg.com blob:",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    isProduction
      ? "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.orange.com https://api.telecel.cf https://*.sentry.io https://unpkg.com blob:"
      : "connect-src 'self' ws: wss: http: https: blob:",
    "frame-ancestors 'none'",
    "frame-src 'self' https://www.youtube.com",
    "base-uri 'self'",
    "form-action 'self'",
  ];

  // In local HTTP development (especially iOS Safari over LAN), forcing HTTPS
  // can break CSS/JS loading because upgraded https:// requests have no TLS endpoint.
  if (isProduction) {
    directives.push("upgrade-insecure-requests");
  }

  return directives.join("; ");
}

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  ...(isProduction
    ? [
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
    ]
    : []),
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Content-Security-Policy",
    value: buildContentSecurityPolicy(),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Turbopack enabled via CLI flag --turbopack in dev

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "date-fns"],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        // iOS Safari requires Content-Type: application/wasm for WASM files.
        source: "/dotlottie-player.wasm",
        headers: [
          { key: "Content-Type", value: "application/wasm" },
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // CV preview proxy (owner) — must be embeddable in an <iframe> on the same origin.
        // Override the global X-Frame-Options: DENY and frame-ancestors: 'none'
        // that are applied by the catch-all source: "/(.*)" above.
        // Next.js applies headers in order; later entries override duplicate keys.
        source: "/api/cv/preview",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
        ],
      },
      {
        // CV public access (employers) — same iframe embedding exception.
        source: "/api/cv/public/:userId",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/emplois",
        destination: "/jobs",
        permanent: true,
      },
    ];
  },

  // Logging: suppress noisy fetch logs in dev
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
};

export default nextConfig;
