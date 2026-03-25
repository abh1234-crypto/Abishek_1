/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'void': '#080811',         // Deep space black
        'void-light': '#121223',   // Lighter void for cards
        'cyan': '#00E5FF',         // Starlight cyan
        'cyan-dark': '#00B3CC',
        'nebula': '#FF00A0',       // Nebula pink
        'nebula-dark': '#CC0080',
        'cosmic': '#7B2CBF',       // Deep purple
        'ink': '#FFFFFF',          // Text color
        'glass-dark': 'rgba(18, 18, 35, 0.65)',
        'glass-border': 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'cyan-glow': '0 0 20px rgba(0, 229, 255, 0.4)',
        'nebula-glow': '0 0 20px rgba(255, 0, 160, 0.4)',
        'cosmic-glow': '0 0 30px rgba(123, 44, 191, 0.3)',
        'glass-dark': '0 10px 40px rgba(0,0,0,0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
