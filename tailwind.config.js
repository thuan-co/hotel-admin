/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'hotel-title': "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        'hotel-form': 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
      }
    },
  },
  plugins: [],
}

