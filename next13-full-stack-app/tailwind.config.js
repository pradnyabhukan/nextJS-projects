/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}", 
    "./app/**/*.{html,js,ts,jsx,tsx}",
    "./pages/**/*.{html,js,ts,jsx,tsx}",
    "./components/**/*.{html,js,ts,jsx,tsx}"
],
theme: {
  extend: {
    fontFamily:{
      montserrat:["var(--font-montserrat)"],
    },
    primary : '#243c5a', 
    secondary : {
      100: '#243c5a',
    },
    gridTemplateColumns: {
      fluid: "repeat(auto-fit, minmax(15rem, 1fr))"
    }
  },

},
plugins: [],
};
