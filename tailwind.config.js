/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#2563EB',
        secondary: '#464555',
        // secondary: '#567EFF',
        light: '#AAA9BC',
        strongRed: '#DC003E',
        lightRed: '#FF576E'
      },
      keyframes: {
        fade_in: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20%)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        shake: {
          '0%': {
            transform: 'translate(1px, 1px) rotate(0deg)'
          },
          '10%': {
            transform: 'translate(-1px, -2px) rotate(-1deg)'
          },
          '20%': {
            transform: 'translate(-3px, 0px) rotate(1deg)'
          },
          '30%': {
            transform: 'translate(3px, 2px) rotate(0deg)'
          },
          '40%': {
            transform: 'translate(-1px, -1px) rotate(1deg)'
          },
          '50%': {
            transform: 'translate(-1px, 2px) rotate(-1deg)'
          },
          '60%': {
            transform: 'translate(-3px, 1px) rotate(0deg)'
          },
          '70%': {
            transform: 'translate(3px, 1px) rotate(-1deg)'
          },
          '80%': {
            transform: 'translate(-1px, -1px) rotate(1deg)'
          },
          '90%': {
            transform: 'translate(1px, 2px) rotate(0deg)'
          },
          '100%': {
            transform: 'translate(1px, -2px) rotate(-1deg)'
          },
        }
      },
      animation: {
        fadeIn: 'fade_in .8s ease-in-out',
        shake: 'shake .8s ease-in-out infinite'
      }
    },
  },
  plugins: []
}
