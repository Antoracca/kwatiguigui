// global-error.tsx — fallback for unrecoverable root-layout errors.
//
// RULES (do NOT violate):
// 1. NO "use client" — React 19 / Next.js 16 calls useContext internally when
//    prerendering "use client" components that contain onClick handlers, and
//    that context is null during /_global-error prerender → crash.
// 2. NO <html> / <body> — React 19 injects a head-manager via useContext when
//    it detects <html>, which also crashes the prerender.
// 3. NO onClick / event handlers — triggers React 19 action-context internals.
// 4. Use plain <a href="/"> for both actions — full page reload is the correct
//    behavior when the root layout itself has crashed.
// 5. NO external imports — any package that calls React hooks at module level
//    will corrupt React in this isolated prerender context.

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void; // provided by Next.js — unused here, full reload instead
}

export default function GlobalError({ error }: GlobalErrorProps) {
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
          &#9888;
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
          <a
            href="/"
            style={{
              padding: "0.625rem 1.5rem",
              borderRadius: 999,
              background: "#003189",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.875rem",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Reessayer
          </a>
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
              display: "inline-block",
            }}
          >
            Accueil
          </a>
        </div>
      </div>
    </div>
  );
}
