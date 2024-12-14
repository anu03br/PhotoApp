/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Define custom color names
        primary: colors.gray['100'], // Map primary to blue-500
        secondary: colors.blue['400'], // Map secondary to yellow-500
        neutral: colors.gray['500'], // Map neutral to all gray shades
      },
    },
  },
  plugins: [],
}

