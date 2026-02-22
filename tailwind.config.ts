import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Lato", "sans-serif"],
        script: ["Great Vibes", "cursive"],
      },
      colors: {
        haldi: {
          primary: "#F59E0B",
          secondary: "#FCD34D",
          accent: "#92400E",
          bg: "#FFFBEB",
          text: "#78350F",
        },
        sangeeth: {
          primary: "#7C3AED",
          secondary: "#A78BFA",
          accent: "#C084FC",
          bg: "#0F0A1E",
          text: "#EDE9FE",
        },
        pellikuthuru: {
          primary: "#DC2626",
          secondary: "#F87171",
          accent: "#D4A017",
          bg: "#FEF2F2",
          text: "#7F1D1D",
        },
        pellikoduku: {
          primary: "#D4A017",
          secondary: "#F5E6CC",
          accent: "#8B6914",
          bg: "#FFFDF7",
          text: "#44340A",
        },
        upanayanam: {
          primary: "#D97706",
          secondary: "#FDE68A",
          accent: "#92400E",
          bg: "#FFF8F0",
          text: "#78350F",
        },
        pelli: {
          primary: "#B8860B",
          secondary: "#FFFFF0",
          accent: "#DAA520",
          bg: "#FFFFF0",
          text: "#3D2B1F",
        },
        vratam: {
          primary: "#EA580C",
          secondary: "#FFEDD5",
          accent: "#C2410C",
          bg: "#FFF7ED",
          text: "#7C2D12",
        },
      },
      animation: {
        "fade-in": "fadeIn 1s ease-in-out",
        "slide-up": "slideUp 0.8s ease-out",
        "float": "float 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
