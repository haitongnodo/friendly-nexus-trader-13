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
        border: {
          DEFAULT: "hsl(var(--border))",
          subtle: "rgba(255, 255, 255, 0.1)",
        },
        background: {
          base: "hsl(var(--background))",
          surface: "hsl(var(--card))",
          elevated: "hsl(var(--popover))",
        },
        text: {
          primary: "hsl(var(--foreground))",
          secondary: "hsl(var(--muted-foreground))",
          tertiary: "hsl(var(--muted-foreground) / 0.8)",
          disabled: "hsl(var(--muted-foreground) / 0.5)",
        },
        overlay: {
          DEFAULT: "rgba(0, 0, 0, 0.5)",
          hover: "rgba(255, 255, 255, 0.05)",
        },
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(to right, #FF7A0F, #FFB366)',
        'card-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))',
        'hover-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
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
        'ai-gradient': `
          radial-gradient(
            ellipse at bottom,
            rgba(255, 144, 70, 0.1) 0%,
            rgba(86, 11, 173, 0.05) 25%,
            rgba(10, 14, 51, 0.08) 50%,
            transparent 90%
          )
        `,
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "copy-success": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" }
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" }
        }
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "copy-success": "copy-success 0.3s ease-out",
        "pulse-subtle": "pulse-subtle 15s ease-in-out infinite"
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;