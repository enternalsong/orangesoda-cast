/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{vue,js,jsx,tsx}'],
  theme: {
    extend: {
      colors:{
        brand:'#FF7F50',
        secondary:'#30A9DE',
        positive:'#4CAF50',
        negative:'#FF5050',
        caution:'#F6AE2D',
        carousel01:'#24262f',
        carousel02:'#2E3932',
        carousel03:'#063540',
        copyright: '#AAA',
        green:{
          login:'#1ED760',
          hoverLogin:'#4CAF50',
        }
      },
      fontFamily: {
        'sans': ['Noto Sans TC','sans-serif'],
      },
    },
  },
  plugins: [],
}

