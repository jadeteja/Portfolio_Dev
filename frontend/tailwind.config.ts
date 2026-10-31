import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#FF6B00",
          secondary: "#FF8C42",
          light: "#FFF3E8",
          border: "#FFE0C2",
          badge: "#FFF0E2",
          dark: "#1F2937",
          muted: "#6B7280",
          card: "#FFFFFF",
          bg: "#FFFFFF",
          subtle: "#F9FAFB",
          line: "#E5E7EB",
          whatsapp: "#25D366",
          whatsappHover: "#20bd5a",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(0, 0, 0, 0.04)",
        card: "0 4px 20px rgba(0, 0, 0, 0.05)",
        cardHover: "0 10px 30px rgba(255, 107, 0, 0.12)",
        glow: "0 8px 24px rgba(255, 107, 0, 0.35)",
        whatsapp: "0 6px 20px rgba(37, 211, 102, 0.4)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
