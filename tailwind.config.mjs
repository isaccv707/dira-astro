/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        greenPrimary: '#228F04',
        greenSecondary: '#6EC225',
        greenLigth: '#86AB27',
        yellowPrimary: '#D3D93B',
        yellowSecondary: '#C4BA18',
        red: '#b03a2e',
        black: '#181818',
        white: '#ffffff',
      },
    }
  },
  plugins: []
}
