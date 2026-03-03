"use client";

// global-error.tsx — Next.js 16 + React 19 constraints:
// ✅ MUST have <html> and <body> (global-error replaces the root layout)
// ✅ MUST be "use client"
// ❌ NO external imports (any package using React hooks crashes prerender)
// ❌ NO React hooks (useContext, useEffect, useState...)
// ❌ NO Next.js components (Link, Image…) — they use internal contexts
// Use only plain HTML + inline styles.

export default function GlobalError({
    error,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="fr">
            <body
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
                        {error?.digest && (
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

                    <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
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
            </body>
        </html>
    );
}
