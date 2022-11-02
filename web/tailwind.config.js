/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "Roboto Slab, sans-serif",
        poor: "Poor Story, cursive"
      },
      colors: {
        bgCopa: "#121214",
        textGreen: "#129E57",
        textGray: "#E1E1E6",
        textGrayDark: "#8D8D99",
        borderCopa: "#323238",
        bgButton: "#f7dd43"
      },
      backgroundImage: {
        bgCopaImg: "url('/bgeffects.png')"
      }

    },
  },
  plugins: [],
}
