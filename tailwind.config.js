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
      small : "300",
      regular: '400',
      bold: '500',
      extra:"700"
    },
    screens: {
      'md': '1024px',
      'lg': '1280px',
    },
    boxShadow: {
      'button':'1px 1px 4px 1px rgba(0, 0, 0, 0.25)',
      'search': ' 0px 0px 14px 1px rgba(0,0,0,0.10)',
      'md' : '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      'lg'	: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
    },
  },
  plugins: [],
}


