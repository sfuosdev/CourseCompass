module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    
  ],
  theme: {
    extend: {
      
      
      colors: {
        'custom-blue': '#007bff',
        'custom-red': '#dc3545',
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
    },
  },
  variants: {
    // Define variants here, like 'hover', 'focus', etc.
    extend: {},
  },
  plugins: [
    // Add any Tailwind plugins you're using here
  ],
};
