/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors:{
        primary:'#5542F6',
        highlight:"#eae8fb",
        bgGray:"#fbfafd"
      },
      keyframes:{
        dropdown:{
          '0%':{
            transform:'translate(50% -100%) scale(0,0)',
            opacity:0
          },
          '100%':{
            transform:'translate(50% 0%) scale(1,1)',
            opacity:1
          },
        }
      },
      animation:{
        dropdown:"dropdown 0.4s ease-in-out "
      }
    },
  },
  plugins: [],
}

