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
        32: "32rem",
      },
      height: {
        19: "19rem",
      },
    },
  },
  plugins: [],
};
