/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bosch: {
          DEFAULT: '#00885A', // Bosch Green
          light: '#00A870',
          dark: '#006644'
        }
      },
      keyframes: {
        'scroll-left': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        'scroll-right': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' }
        }
      },
      animation: {
        'skill-scroll-left': 'scroll-left 25s linear infinite',
        'skill-scroll-right': 'scroll-right 25s linear infinite'
      }
    }
  },
  plugins: [
    function ({ addUtilities, variants }) {
      const newUtilities = {
        '.paused': {
          'animation-play-state': 'paused'
        },

        '.running': {
          'animation-play-state': 'running'
        }
      }

      addUtilities(newUtilities, variants('animation'))
    }
  ]
}
