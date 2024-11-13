/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: ({ opacityValue }) => {
          if (opacityValue !== undefined) {
            return `rgba(var(--primary), ${opacityValue})`
          }
          return `rgb(var(--primary))`
        },
        background: ({ opacityValue }) => {
          if (opacityValue !== undefined) {
            return `rgba(var(--background), ${opacityValue})`
          }
          return `rgb(var(--background))`
        },
        'main-background': ({ opacityValue }) => {
          if (opacityValue !== undefined) {
            return `rgba(var(--main-background), ${opacityValue})`
          }
          return `rgb(var(--main-background))`
        },
        gray: ({ opacityValue }) => {
          if (opacityValue !== undefined) {
            return `rgba(var(--gray), ${opacityValue})`
          }
          return `rgb(var(--gray))`
        },
        text: ({ opacityValue }) => {
          if (opacityValue !== undefined) {
            return `rgba(var(--text), ${opacityValue})`
          }
          return `rgb(var(--text))`
        },
        input: {
          100: '#F7F7F7',
        },
        border: '#EAEAEB',
      },
    },
  },
  plugins: [],
}
