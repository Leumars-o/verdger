/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#E6E6E6",
        "primary-light": "#E6EAED",
        secondary: "#CCCCCC",
        cta: "#323232",
        "cta-1": "#1A2B3B",
      },
      fontSize: {
        12: "1.2rem",
        13: "1.3rem",
        16: "1.6rem",
        28: "2.8rem",
      },
      padding: {
        50: "13rem",
      },
      width: {
        35: "35rem",
      },
      height: {
        19: "19rem",
      },
      boxShadow: {
        "inner-custom": "inset 0 2px 8px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
