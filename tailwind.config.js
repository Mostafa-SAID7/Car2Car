/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B0D10',
        panel: '#14171C',
        elevated: '#1B1F26',
        orange: '#F5A710',
        cyan: '#58D5E6',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(245, 167, 16, 0.18)',
      },
    },
  },
  plugins: [],
}
