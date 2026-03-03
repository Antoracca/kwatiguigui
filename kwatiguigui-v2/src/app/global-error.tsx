"use client"; // required by Next.js — global-error MUST be a Client Component

// INVARIANTS — do NOT break any of these:
// 1. NO <html>/<body>   → React 19 injects head-manager via useContext when it
//                          detects <html>; that context is null here → crash.
// 2. NO onClick handlers → React 19 sets up form/action context via useContext
//                          for any element with an event handler → crash.
// 3. NO React hooks      → no explicit useContext calls in our code.
// 4. NO external imports → any package calling React hooks at module level
//                          corrupts React in this isolated prerender context.
// 5. Use <a href="/"> for both actions — full page reload is the correct UX
//    when the root layout itself has crashed; reset() would re-render a broken
//    tree anyway.

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void; // provided by Next.js — unused, <a href="/"> instead
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
