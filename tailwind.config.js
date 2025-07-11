/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#B282E3",
        bgDark: "#15171A",
        bgCard: "#211F2A",
      }
    },
  },
  plugins: [],
}