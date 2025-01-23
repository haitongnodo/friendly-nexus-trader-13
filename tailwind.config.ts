import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        'primary-gradient': 'linear-gradient(to right, #FF7A0F, #FFB366)',
      },
      colors: {
        primary: {
          DEFAULT: "#FF7A0F",
          hover: "#FF8D2E",
          pressed: "#E66400",
          ghost: "rgba(255, 122, 15, 0.08)",
          foreground: "#351C06",
        },
        background: {
          base: "#0A0A0D",
          subtle: "#101013",
          surface: "#141417",
          elevated: "#18181C",
          highlight: "#1D1D22",
        },
        text: {
          primary: "rgba(255, 255, 255, 0.95)",
          secondary: "rgba(255, 255, 255, 0.82)",
          tertiary: "rgba(255, 255, 255, 0.65)",
          disabled: "rgba(255, 255, 255, 0.45)",
          highlight: "#FFB366",
        },
        semantic: {
          success: "#2ECC71",
          "success-dark": "#25A85C",
          warning: "#E6B412",
          error: "#E53E3E",
          info: "#3B82F6",
        },
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.08)",
          subtle: "rgba(255, 255, 255, 0.06)",
          strong: "rgba(255, 255, 255, 0.08)",
          focus: "rgba(255, 122, 15, 0.5)",
          active: "#FF7A0F",
        },
        overlay: {
          hover: "rgba(255, 122, 15, 0.2)",
          active: "rgba(255, 122, 15, 0.15)",
          modal: "rgba(0, 0, 0, 0.7)",
        },
      },
      boxShadow: {
        small: "0 1px 2px rgba(0, 0, 0, 0.3)",
        medium: "0 2px 4px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)",
        large: "0 4px 6px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)",
        glow: "0 0 0 1px rgba(255, 122, 15, 0.3), 0 0 4px rgba(255, 122, 15, 0.2), 0 0 8px rgba(255, 122, 15, 0.1)",
        "glow-sm": "0 0 0 1px rgba(255, 122, 15, 0.2), 0 0 2px rgba(255, 122, 15, 0.1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
