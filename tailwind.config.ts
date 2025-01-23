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
      colors: {
        primary: {
          DEFAULT: "#FF7A0F",
          hover: "#FF8D2E",
          pressed: "#E66400",
          ghost: "rgba(255, 122, 15, 0.08)",
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
        },
        overlay: {
          hover: "rgba(255, 255, 255, 0.08)",
          active: "rgba(255, 255, 255, 0.12)",
          modal: "rgba(0, 0, 0, 0.7)",
        },
      },
      boxShadow: {
        small: "0 1px 2px rgba(0, 0, 0, 0.3)",
        medium: "0 2px 4px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)",
        large: "0 4px 6px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)",
      },
      opacity: {
        solid: "1",
        semi: "0.8",
        medium: "0.5",
        light: "0.2",
        subtle: "0.08",
      },
      transitionDuration: {
        fast: "150ms",
        normal: "200ms",
        slow: "300ms",
      },
      transitionTimingFunction: {
        DEFAULT: "ease",
      },
      ringWidth: {
        DEFAULT: "2px",
      },
      ringOffsetWidth: {
        DEFAULT: "2px",
      },
      ringColor: {
        DEFAULT: "rgba(255, 122, 15, 0.35)",
      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(135deg, #FF7A0F 0%, #FF8D2E 100%)",
        "surface-gradient": "linear-gradient(135deg, rgba(255, 122, 15, 0.05) 0%, rgba(255, 122, 15, 0.02) 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;