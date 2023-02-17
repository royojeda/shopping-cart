/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "fit-64": "repeat(auto-fit, 16rem)",
      },
    },
  },
  plugins: [],
};
