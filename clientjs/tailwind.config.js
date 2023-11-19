/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          yellow: '#F7C750',
          blue: '#6C90F5',
          lightBlue: '#AAC2FD',
          white: '#FFFFFF',
        }
      }
      },
    },
  plugins: [],
}
