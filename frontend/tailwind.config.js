/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#2d6a4f',
          800: '#1b4332',
          900: '#081c15',
          950: '#030a07',
        },
        mint: {
          50: '#f3faf7',
          100: '#d8f3dc',
          200: '#b7e4c7',
          300: '#95d5b2',
          400: '#74c69d',
          500: '#52b788',
          600: '#40916c',
        },
        ivory: {
          50: '#ffffff',
          100: '#fcfbf9',
          200: '#faf9f6',
          300: '#f4f1ea',
          400: '#ece7dd',
          500: '#dfd8ca',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
