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
