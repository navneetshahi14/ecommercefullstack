/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      gridTemplateColumns:{
        '454':"1fr 1fr"
      },
      colors:{
        'primary':"#5542f6"
      },
      boxShadow:{
        '4xl':"0 0 10px rgba(0,0,0,0.1)"
      },
      keyframes:{
        dropdown:{
          '0%':{
            transform:'translateY(-100%) scale(0,0)',
            opacity:0
          },
          '100%':{
            transform:'translateY(0%) scale(1,1)',
            opacity:1
          },
        }
      },
      animation:{
        dropdown:"dropdown 0.7s ease-in-out "
      }
    },
  },
  plugins: [],
}

