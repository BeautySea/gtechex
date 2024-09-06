/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    backgroundImage: {
      'empty-image': "url('../src/assets/emptystate.png')",
      'refer-earn': "url('../src/assets/refer-bg.png')",
      'landing-page-hero-bg': "url('../src/assets/landing-page-bg.svg')",
      'black-refer':
        "linear-gradient(to right, #131D26, #243647 ), url('../src/assets/refer-bg.png)",
      // url('../src/assets/referSVG.svg)
      // 'refer-earn':
      // "linear-gradient(to right , #190534, #332447, url('../src/assets/refer-bg.png')",
    },
    backgroundPosition: {
      'refer-earn-position': '50% 0%',
    },
  },
  plugins: [],
};
