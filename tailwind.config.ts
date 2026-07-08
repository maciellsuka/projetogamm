import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    // Editorial 12-col grid, generous gutters — set explicitly rather than
    // relying on Tailwind's default container so the rhythm stays consistent
    // across every page (see DESIGN_SYSTEM.md).
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "2rem",
        lg: "3rem",
        xl: "4rem",
      },
    },
    extend: {
      colors: {
        paper: "#F5F3EE", // base background — warm, not stark white
        ink: "#14130F", // primary text / near-black
        stone: "#8B8579", // secondary text, captions
        line: "#D8D3C7", // hairline rules, dividers
        clay: "#6B5A45", // sole accent — used sparingly (links, marks)
        clay_light: "#A8947A",
        forest: "#3D423A", // rare secondary accent for tags/status
        tfg_blue: "#263546",
        tfg_linho: "#FAEEE5",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        // Editorial scale — deliberately few sizes, used consistently
        "display-xl": [
          "clamp(3.5rem, 9vw, 8.5rem)",
          { lineHeight: "0.98", letterSpacing: "-0.02em" },
        ],
        "display-lg": [
          "clamp(2.5rem, 6vw, 5.5rem)",
          { lineHeight: "1.02", letterSpacing: "-0.02em" },
        ],
        "display-md": [
          "clamp(1.8rem, 3.2vw, 3rem)",
          { lineHeight: "1.08", letterSpacing: "-0.01em" },
        ],
        eyebrow: ["0.75rem", { lineHeight: "1", letterSpacing: "0.18em" }],
        "body-lg": ["1.25rem", { lineHeight: "1.6" }],
        body: ["1rem", { lineHeight: "1.7" }],
        caption: ["0.8125rem", { lineHeight: "1.5", letterSpacing: "0.01em" }],
      },
      spacing: {
        // 8px base scale extended for generous editorial whitespace
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
        "42": "10.5rem",
      },
      maxWidth: {
        prose: "42rem",
        editorial: "1600px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
