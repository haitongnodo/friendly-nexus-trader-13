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
      fontFamily: {
        mono: ["SF Mono", "Roboto Mono", "monospace"],
        display: ["SF Pro Display", "Inter", "sans-serif"],
      },
      fontSize: {
        "title": ["36px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" }],
        "section": ["20px", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
        "label": ["14px", { lineHeight: "1.4", fontWeight: "500" }],
        "helper": ["13px", { lineHeight: "1.4", fontWeight: "400" }],
        "chat": ["15px", { lineHeight: "1.6", fontWeight: "400" }],
        "mono-lg": ["24px", { lineHeight: "1.2", fontFamily: "SF Mono, monospace" }],
        "mono-base": ["14px", { lineHeight: "1.4", fontFamily: "SF Mono, monospace" }],
      },
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
          success: "#22C55E",
          "success-dark": "#25A85C",
          warning: "#E6B412",
          error: "#EF4444",
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
        "glow-lg": "0 0 0 2px rgba(255, 122, 15, 0.3), 0 0 8px rgba(255, 122, 15, 0.2), 0 0 16px rgba(255, 122, 15, 0.1)",
        "neon": "0 0 5px rgba(255, 122, 15, 0.5), 0 0 20px rgba(255, 122, 15, 0.3), 0 0 40px rgba(255, 122, 15, 0.2)",
        "neon-sm": "0 0 3px rgba(255, 122, 15, 0.4), 0 0 12px rgba(255, 122, 15, 0.2)",
        "neon-lg": "0 0 8px rgba(255, 122, 15, 0.6), 0 0 30px rgba(255, 122, 15, 0.4), 0 0 60px rgba(255, 122, 15, 0.3)",
        'stats': '0 4px 24px rgba(0, 0, 0, 0.2)',
        'input-focus': '0 0 0 4px rgba(255, 122, 15, 0.1)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.24)',
      },
      keyframes: {
        "neon-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        "fade-up": {
          "0%": { 
            opacity: "0",
            transform: "translateY(10px) scale(0.98)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) scale(1)"
          }
        },
        "number-transition": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" }
        }
      },
      animation: {
        "neon-pulse": "neon-pulse 2s ease-in-out infinite",
        "fade-up": "fade-up 0.3s ease-out forwards",
        "number-transition": "number-transition 0.3s ease-out"
      },
      maxWidth: {
        'chat': '768px',
      },
      spacing: {
        'chat-input': '44px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
