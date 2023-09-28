/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class'
  ,
  content: [
    "./src/**/*.{html,js}",
    "./public/**/*.{html,js}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        main: '#050804',
        secondary: '#19201A',
        third: '#2C312B',
        fourth: '#9E8772',
        fifth: '#D9D9D9',
      },
    },
    plugins: [require("flowbite/plugin")],
  }
};