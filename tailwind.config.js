/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: { 50: "#E1F5EE", 800: "#085041", 900: "#04342C" },
        amber: { 50: "#FAEEDA", 600: "#BA7517", 800: "#633806" },
        ink: { 900: "#2C2C2A" },
      },
      borderRadius: {
        control: "8px",
        card: "12px",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
