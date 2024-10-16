/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#E6E6E6",
        secondary: "#CCCCCC",
        cta: "#323232",
      },
    },
  },
  plugins: [],
};
