/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      textColor: {
        primary: '#f6eade', // Title/Header color
        secondary: '#dabda1', // Bulk text color
      },
      fontFamily: {
        pixel: ['TimesNewPixel', 'monospace'],
      },
      backgroundColor: {
        primary: '#191516',
        secondary: '#1f191a',
        input_box: '#423532',
        // NAV
        nav: '#1f1919',
        nav_btn_hover: '#452c1f',
        nav_btn_active: '#734325',
        // Buttons
        btn: {
          primary: {
            DEFAULT: '#251d1c',
            active: '#39271E',
            hover: '#251b18',
          },
        },
      },
      borderColor: {
        input_highlight: '#734532',
        primary: '#452c1f',
        secondary: '#8b7355',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
};
