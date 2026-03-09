/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'avatar-red': '#ffd4d4',
        'avatar-green': '#d4ffd4',
        'avatar-blue': '#d4e4ff',
        'purple-selected': '#f3e8ff',
        'purple-selected-dark': '#2d1b4e',
        'race-blue': '#5b5bff',
      },
    },
  },
  plugins: [],
}
