/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0a",
        bone: "#f0ede8",
        blood: "#e62020",
        exhaust: "#ff5500",
        smoke: "#111111",
        steel: "#1a1a1a",
        border: "#222222",
        muted: { DEFAULT: "#1a1a1a", foreground: "#888888" },
        background: "#0a0a0a",
        foreground: "#f0ede8",
        card: { DEFAULT: "#111111", foreground: "#f0ede8" },
        popover: { DEFAULT: "#111111", foreground: "#f0ede8" },
        primary: { DEFAULT: "#e62020", foreground: "#0a0a0a" },
        secondary: { DEFAULT: "#111111", foreground: "#f0ede8" },
        accent: { DEFAULT: "#ff5500", foreground: "#0a0a0a" },
        destructive: { DEFAULT: "#e62020", foreground: "#f0ede8" },
        input: "#222222",
        ring: "#e62020",
      },
      fontFamily: {
        display: ['"Bebas Neue"', "Impact", "system-ui", "sans-serif"],
        sans: ['"Chivo"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      borderRadius: {
        lg: "0px",
        md: "0px",
        sm: "0px",
      },
      keyframes: {
        "marquee-x": {
          from: { transform: "translateX(0%)" },
          to: { transform: "translateX(-50%)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        marquee: "marquee-x 30s linear infinite",
        "marquee-fast": "marquee-x 18s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
