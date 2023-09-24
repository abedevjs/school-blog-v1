/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xl: { max: "1440px" },
      lg: { max: "976px" },
      md: { max: "768px" },
      sm: { max: "480px" },
    },
    // container: {
    //   center: true,
    //   padding: '2rem',
    // },
    extend: {
      colors: {
        primaryBlue: "#255cff",
        primaryBlueBold: "#2e4057",
        secondaryYellow: "#f4D03f",
        secondaryYellowTint: "#fbf0c0",
        secondaryGrey: "#f5f5f5",
        bodyBackColor: "#f7f8fe",
        textColor: "#0b2471",
        random: "#40A1FF",
      },
      gridTemplateRows: {
        8: "repeat(8, minmax(0, 1fr))",
        9: "repeat(9, minmax(0, 1fr))",
        10: "repeat(10, minmax(0, 1fr))",
        11: "repeat(11, minmax(0, 1fr))",
      },
    },

    fontFamily: {
      title: ["Livvic", "sans-serif"],
      text: ["Lexend", "sans-serif"],
    },
  },
  plugins: [],
};
