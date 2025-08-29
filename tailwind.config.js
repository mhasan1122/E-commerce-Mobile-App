/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./App.tsx", 
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#2ECC71',
        secondary: '#27AE60',
        accent: '#1ABC9C',
        background: '#F4F9F4',
        green: {
          50: '#F4F9F4',
          100: '#E8F5E8',
          500: '#2ECC71',
          600: '#27AE60',
        }
      },
    },
  },
  plugins: [],
}