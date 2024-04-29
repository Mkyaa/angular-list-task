/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#e6f4ff",
        "bg-secondary": "#0e87fe",
        "bg-thirdary": "#f4f8fb",
        "light-blue": "#e6f4ff",
        "normal-blue": "#0e87fe",
        "light-gray": "#fafafa",
      },
      boxShadow: {
        "box-bottom-shadow":" 0 3px 6px -6px gray"
      }
    },
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
    },
  },
  plugins: [],
};
