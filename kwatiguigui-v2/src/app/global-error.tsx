"use client";

// global-error.tsx — fallback for unrecoverable root-layout errors.
//
// IMPORTANT: do NOT render <html> or <body> here.
// In Next.js 16 + React 19, rendering <html> triggers React's document
// context which injects a head-manager via useContext. That context is
// null during the /_global-error prerender, crashing the build.
// Next.js wraps this component in its own HTML shell automatically.

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <div
      style={{
        margin: 0,
        fontFamily: "system-ui, sans-serif",
        background: "#fff",
        color: "#111",
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "1rem",
      }}
    >
      <div>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: "#fef2f2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
            fontSize: 28,
          }}
        >
          ⚠️
        </div>

        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "0 0 0.75rem" }}>
          Une erreur critique est survenue
        </h1>

        <p
          style={{
            color: "#6b7280",
            maxWidth: 400,
            margin: "0 auto 2rem",
            lineHeight: 1.6,
          }}
        >
          Nous sommes desoles. L&apos;erreur a ete enregistree.
          {error.digest && (
            <span
              style={{
                display: "block",
                marginTop: "0.5rem",
                fontFamily: "monospace",
                fontSize: "0.75rem",
                color: "#9ca3af",
              }}
            >
              Code : {error.digest}
            </span>
          )}
        </p>

        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
          <button
            type="button"
            onClick={reset}
            style={{
              padding: "0.625rem 1.5rem",
              borderRadius: 999,
              background: "#003189",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.875rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            Reessayer
          </button>
          <a
            href="/"
            style={{
              padding: "0.625rem 1.5rem",
              borderRadius: 999,
              background: "#f3f4f6",
              color: "#374151",
              fontWeight: 600,
              fontSize: "0.875rem",
              textDecoration: "none",
            }}
          >
            Accueil
          </a>
        </div>
      </div>
    </div>
  );
}
