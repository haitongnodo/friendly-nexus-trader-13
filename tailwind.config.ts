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
        "title": ["32px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" }],
        "section": ["20px", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
        "label": ["14px", { lineHeight: "1.4", fontWeight: "500" }],
        "helper": ["13px", { lineHeight: "1.4", fontWeight: "400" }],
        "chat": ["15px", { lineHeight: "1.6", fontWeight: "400" }],
        "mono-lg": ["24px", { lineHeight: "1.2", fontFamily: "SF Mono, monospace" }],
        "mono-base": ["14px", { lineHeight: "1.4", fontFamily: "SF Mono, monospace" }],
      },
      scale: {
        '102': '1.02',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(to right, #FF7A0F, #FFB366)',
        'page-gradient': `
          linear-gradient(180deg, 
            rgba(8, 8, 12, 0.95) 0%,
            rgba(12, 12, 18, 0.85) 40%,
            rgba(20, 20, 24, 0.75) 100%
          ),
          linear-gradient(180deg,
            transparent 0%,
            rgba(255, 122, 15, 0.03) 60%,
            rgba(255, 122, 15, 0.08) 100%
          )
        `,
        'noise': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%\' height=\'100%\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
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
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "gradient-shift": "gradient-shift 3s ease infinite",
      },
      maxWidth: {
        'chat': '768px',
      },
      spacing: {
        'chat-input': '48px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
