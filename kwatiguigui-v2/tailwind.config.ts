import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary — Bleu Prestige (drapeau RCA)
        primary: {
          50: "#EBF0FF",
          100: "#D6E0FF",
          200: "#ADBBFF",
          300: "#7A8FFF",
          400: "#4766F0",
          500: "#003189",
          600: "#002A75",
          700: "#002060",
          800: "#00184D",
          900: "#001038",
          950: "#000A24",
        },
        // Secondary — Vert Esperance (drapeau RCA)
        secondary: {
          50: "#EEFBEE",
          100: "#D5F5D5",
          200: "#ABEBAB",
          300: "#72DA72",
          400: "#43C643",
          500: "#289728",
          600: "#208020",
          700: "#1A6A1A",
          800: "#155415",
          900: "#0F3F0F",
          950: "#082508",
        },
        // Accent — Or Soleil (drapeau RCA)
        accent: {
          50: "#FEFCE8",
          100: "#FEF9C3",
          200: "#FEF08A",
          300: "#FDE047",
          400: "#FACC15",
          500: "#EAB308",
          600: "#CA8A04",
          700: "#A16207",
          800: "#854D0E",
          900: "#713F12",
          950: "#422006",
        },
        // Neutral — Slate
        neutral: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
          950: "#020617",
        },
        // Semantic
        success: {
          50: "#F0FDF4",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
        },
        warning: {
          50: "#FFFBEB",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
        },
        error: {
          50: "#FEF2F2",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
        },
        info: {
          50: "#EBF0FF",
          500: "#003189",
          600: "#002A75",
          700: "#002060",
        },
      },
      fontFamily: {
        heading: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      fontSize: {
        "display-2xl": [
          "4.5rem",
          { lineHeight: "1.1", fontWeight: "800", letterSpacing: "-0.02em" },
        ],
        "display-xl": [
          "3.75rem",
          { lineHeight: "1.1", fontWeight: "700", letterSpacing: "-0.02em" },
        ],
        "display-lg": [
          "3rem",
          { lineHeight: "1.15", fontWeight: "700", letterSpacing: "-0.01em" },
        ],
        "heading-xl": [
          "2.25rem",
          { lineHeight: "1.2", fontWeight: "600" },
        ],
        "heading-lg": [
          "1.875rem",
          { lineHeight: "1.25", fontWeight: "600" },
        ],
        "heading-md": [
          "1.5rem",
          { lineHeight: "1.3", fontWeight: "600" },
        ],
        "heading-sm": [
          "1.25rem",
          { lineHeight: "1.35", fontWeight: "600" },
        ],
        "body-lg": [
          "1.125rem",
          { lineHeight: "1.6", fontWeight: "400" },
        ],
        "body-md": [
          "1rem",
          { lineHeight: "1.6", fontWeight: "400" },
        ],
        "body-sm": [
          "0.875rem",
          { lineHeight: "1.5", fontWeight: "400" },
        ],
        "body-xs": [
          "0.75rem",
          { lineHeight: "1.5", fontWeight: "400" },
        ],
      },
      // Breakpoints — mobile-first, content-driven (Netflix/Apple/LinkedIn pattern)
      // xs: très petits mobiles (iPhone SE, Galaxy A series)
      // sm: mobiles standard (iPhone 14, Pixel)
      // md: tablettes portrait
      // lg: tablettes paysage + petits laptops
      // xl: desktops
      // 2xl: grands écrans (iMac, 4K)
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },

      borderRadius: {
        none: "0px",
        sm: "4px",
        md: "6px",
        lg: "8px",
        xl: "12px",
        "2xl": "16px",
        "3xl": "24px",
        full: "9999px",
      },
      boxShadow: {
        xs: "0 1px 2px rgba(0, 49, 137, 0.05)",
        sm: "0 1px 3px rgba(0, 49, 137, 0.08), 0 1px 2px rgba(0, 49, 137, 0.04)",
        md: "0 4px 6px rgba(0, 49, 137, 0.07), 0 2px 4px rgba(0, 49, 137, 0.04)",
        lg: "0 10px 15px rgba(0, 49, 137, 0.07), 0 4px 6px rgba(0, 49, 137, 0.03)",
        xl: "0 20px 25px rgba(0, 49, 137, 0.07), 0 8px 10px rgba(0, 49, 137, 0.03)",
        "2xl": "0 25px 50px rgba(0, 49, 137, 0.15)",
        inner: "inset 0 2px 4px rgba(0, 49, 137, 0.04)",
      },
      spacing: {
        "4.5": "1.125rem",
        "5.5": "1.375rem",
        "18": "4.5rem",
        "88": "22rem",
        "112": "28rem",
        "128": "32rem",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "fade-up": "fadeUp 0.4s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
        "slide-in-left": "slideInLeft 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        "spin-slow": "spin 3s linear infinite",
        shimmer: "shimmer 2s linear infinite",
        marquee: "marquee var(--duration) infinite linear",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
