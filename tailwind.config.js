/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'inter': ["Inter", "sans serif"],
      'Mulish': ["Mulish", "sans serif"],
      'Poppins': ["Poppins", "sans serif"],
    },
    fontWeight: {
      bold: '500',
    },
    screens: {
      'md': '1024px',
      'lg': '1280px',
    },
  },
  plugins: [],
}


