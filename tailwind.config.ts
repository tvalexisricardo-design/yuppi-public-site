import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  // Defense-in-depth: Tailwind's content scanner can silently miss files
  // inside dynamic route folders like app/blog/[slug]/. The base prose
  // classes are safelisted so the typography plugin's output is never
  // dropped; actual spacing is set with explicit arbitrary-variant
  // selectors in components/BlogArticleContent.tsx, which don't depend on
  // this safelist at all.
  safelist: [{ pattern: /^prose(-\w+)?$/ }],
  theme: {
    extend: {
      colors: {
        canvas: "#FCFBF9",
        canvasSoft: "#F5F2EC",
        ink: "#1C1030",
        inkSoft: "#4A3D63",
        violet: {
          DEFAULT: "#4E2E8C",
          dark: "#3A2168",
          light: "#EDE6F7",
        },
        magenta: {
          DEFAULT: "#D91C74",
          light: "#FBE4EF",
        },
        teal: {
          DEFAULT: "#149385",
          light: "#E1F3F0",
        },
        amber: {
          DEFAULT: "#E8992C",
          light: "#FCEEDA",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1180px",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(28, 16, 48, 0.18)",
        card: "0 8px 30px -12px rgba(28, 16, 48, 0.12)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
