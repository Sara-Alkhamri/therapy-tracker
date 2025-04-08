/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'therapy-blue': '#1e3a8a',
      },
      width: {
        '35-rem': '35rem', // Custom width in rem
        '100': '25rem',    // Custom width in rem
        '30p': '30%',      // Custom width in percentage
        '60p': '60%',      // Custom width in percentage
      },
    },
  },
  plugins: [],
};