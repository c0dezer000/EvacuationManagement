/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dswd: {
          red: '#DB0011',
          blue: {
            DEFAULT: '#0F4C92',
            dark: '#072F5F',
            light: '#C7D8F0',
          },
        },
      },
    },
  },
  plugins: [],
};