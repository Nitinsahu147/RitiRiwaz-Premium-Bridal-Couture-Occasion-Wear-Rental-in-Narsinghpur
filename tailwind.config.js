/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#080808',
          charcoal: '#111111',
          softBlack: '#171717',
          card: '#141414',
          border: '#262626',
          gold: '#D4AF37',
          antiqueGold: '#C9A227',
          goldLight: '#E8D08D',
          burgundy: '#651C2A',
          red: '#8B1E2D',
          redDark: '#4A121C',
          cream: '#FAF7F2',
          ivory: '#F4EFE6',
          muted: '#A3A3A3',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #C9A227 50%, #9A7B1C 100%)',
        'burgundy-gradient': 'linear-gradient(135deg, #8B1E2D 0%, #651C2A 100%)',
        'dark-overlay': 'linear-gradient(180deg, rgba(8,8,8,0.7) 0%, rgba(8,8,8,0.3) 50%, rgba(8,8,8,0.9) 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.15)',
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
};
