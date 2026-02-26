import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { loginSchema } from "@/lib/validations/auth";

/**
 * NextAuth.js v5 configuration.
 *
 * Auth flow:
 * 1. User submits WhatsApp number + password via /login
 * 2. CredentialsProvider validates via our API route
 * 3. Session stored as httpOnly cookie (NOT JWT in localStorage)
 * 4. Middleware checks session on protected routes
 *
 * Security:
 * - Passwords hashed with argon2 (server-side only)
 * - Session cookies: httpOnly, secure, sameSite strict
 * - Rate limiting on login attempts (middleware)
 * - No JWT exposed to client
 */
export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "WhatsApp",
      credentials: {
        whatsapp: { label: "Numero WhatsApp", type: "tel" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        // Validate input
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        // TODO: Call API to verify credentials
        // const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/verify`, {
        //   method: "POST",
        //   body: JSON.stringify(parsed.data),
        //   headers: { "Content-Type": "application/json" },
        // });
        // const user = await res.json();
        // if (!res.ok || !user) return null;
        // return user;

        return null; // Placeholder — implement with real auth
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect to /login
      }

      return true;
    },
    async session({ session, token }) {
      // Attach user ID to session
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};
