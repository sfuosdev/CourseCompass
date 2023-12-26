/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          yellow: "#F7C750",
          blue: "#6C90F5",
          lightBlue: "#AAC2FD",
          white: "#FFFFFF",
          whiteBlue: "#EAF0FF",
        },
        secondary: {
          black: "#000000",
          gray: "#ADADAD",
          darkGray: "#4D4D4D",
          blue: "#4570E6",
          darkBlue: "#2D54A6",
        },
      },
    },
    plugins: [
      require("tailwindcss-3d")({ legacy: true }),
      require('tailwind-scrollbar'),
    ],
  },
};
