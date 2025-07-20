module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // add other directories if needed
  ],
  plugins: [require("@tailwindcss/typography")],
};
