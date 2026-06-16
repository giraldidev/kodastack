import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#050D1A",
          900: "#0A192F",
          800: "#0D2444",
          700: "#112D55",
          600: "#163866",
        },
        electric: {
          400: "#FFE600",
          500: "#F7E115",
          600: "#E6CC00",
        },
        glass: {
          white: "rgba(255,255,255,0.04)",
          border: "rgba(255,255,255,0.08)",
          highlight: "rgba(247,225,21,0.12)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(22,56,102,0.6) 0%, transparent 70%)",
        "card-glow":
          "linear-gradient(135deg, rgba(247,225,21,0.08) 0%, rgba(22,56,102,0.4) 100%)",
        "grid-lines":
          "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "60px 60px",
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-12px) rotate(1deg)" },
          "66%": { transform: "translateY(-6px) rotate(-1deg)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.95)", opacity: "0.7" },
          "50%": { transform: "scale(1.05)", opacity: "0.3" },
          "100%": { transform: "scale(0.95)", opacity: "0.7" },
        },
        "draw-line": {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        "slide-up": {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "spin-slow": {
          "0%": { transform: "rotateX(20deg) rotateY(0deg) rotateZ(0deg)" },
          "100%": {
            transform: "rotateX(20deg) rotateY(360deg) rotateZ(0deg)",
          },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "float-slow": "float-slow 6s ease-in-out infinite",
        "pulse-ring": "pulse-ring 3s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease-out forwards",
        shimmer: "shimmer 2.5s linear infinite",
        "spin-slow": "spin-slow 20s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
