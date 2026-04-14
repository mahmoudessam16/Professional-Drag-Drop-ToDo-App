/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "hsl(var(--color-bg) / <alpha-value>)",
        surface: "hsl(var(--color-surface) / <alpha-value>)",
        text: {
          primary: "hsl(var(--color-text-primary) / <alpha-value>)",
          secondary: "hsl(var(--color-text-secondary) / <alpha-value>)",
        },
        accent: "hsl(var(--color-accent) / <alpha-value>)",
        border: "hsl(var(--color-border) / <alpha-value>)",
        hover: "hsl(var(--color-hover) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Josefin Sans", "sans-serif"],
      },
      fontSize: {
        base: ["18px", "28px"],
      },
    },
  },
  plugins: [],
};
