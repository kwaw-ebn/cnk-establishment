/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./App.jsx",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#F5B400',
        brand: {
          black: '#0B0B0B',
          gold:  '#F5B400',
        }
      },
      fontFamily: {
        sans: ['Barlow', 'system-ui', 'sans-serif'],
        condensed: ['Barlow Condensed', 'sans-serif'],
      },
      animation: {
        'pulse-gold': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
