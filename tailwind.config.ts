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
          radial-gradient(
            circle at bottom,
            rgba(255, 144, 70, 0.3) 0%,
            rgba(128, 0, 255, 0.2) 20%,
            rgba(0, 102, 255, 0.15) 40%,
            rgba(255, 0, 128, 0.1) 60%,
            rgba(0, 0, 0, 0.4) 90%
          ),
          linear-gradient(
            180deg,
            transparent 0%,
            rgba(255, 144, 70, 0.1) 100%
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
        }
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "copy-success": "copy-success 0.3s ease-out"
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;