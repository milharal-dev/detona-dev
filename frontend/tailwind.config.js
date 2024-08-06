/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      colors: {
        background: '#210C14',
        primary: '#DAC9DC',
        secondary: '#A67784',
        tertiary: '#411B26',
        accent: '#E793AB',
      },
      screens: {
        '3xs': '320px',
        '2xs': '375px',
        xs: '425px',
        '3xl': '1900px',
        '4xl': '2500px',
        '5xl': '3800px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
