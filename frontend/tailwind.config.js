export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      colors: {
        brand: { 50: "#f0f4ff", 500: "#4f6ef7", 600: "#3a55e8", 900: "#0f1b5c" },
      },
    },
  },
  plugins: [],
}
