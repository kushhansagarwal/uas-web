const daisyui = require("daisyui");
const defaultTheme = require('tailwindcss/defaultTheme')


/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    screens: {
      'xs': '475px',
      'xss': '300px',
      ...defaultTheme.screens,
    },
  },


  plugins: [daisyui]
};

module.exports = config;