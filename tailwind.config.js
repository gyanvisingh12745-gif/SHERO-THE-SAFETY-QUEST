/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Master SHERO Palette
        plum: '#2A0F3F',
        violet: '#6B2FA0',
        orchid: '#B44FD1',
        hotPink: '#FF4F9A',
        rose: '#FF7DB8',
        sunsetPeach: '#FFB48A',
        warmGold: '#FFD27A',
        creamPaper: '#FFF6EA',
        comicInk: '#1B1020',

        // Feedback Choices
        choiceSuccess: '#22C55E',
        choiceDanger: '#EF4444',
        choiceInfo: '#3B82F6',

        // Legacy compatibility
        midnight: '#080B18',
        indigoDeep: '#11142B',
        darkViolet: '#20133F',
        electricBlue: '#4B7BFF',
        neonLavender: '#A78BFA',
        softCyan: '#67E8F9',
        mutedLavender: '#B9B7D6',
        dangerRed: '#FF5470',
        successMint: '#65F5C5',
      },
      fontFamily: {
        brush: ['Caveat', 'cursive'],
        display: ['Poppins', 'Noto Sans Devanagari', 'sans-serif'],
        body: ['Inter', 'Noto Sans Devanagari', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
      boxShadow: {
        'glow-pink': '0 0 25px rgba(255, 79, 154, 0.5)',
        'glow-violet': '0 0 30px rgba(107, 47, 160, 0.5)',
        'glow-gold': '0 0 25px rgba(255, 210, 122, 0.45)',
        'glow-blue': '0 0 25px rgba(59, 130, 246, 0.45)',
        'glow-danger': '0 0 25px rgba(239, 68, 68, 0.45)',
        'glow-success': '0 0 25px rgba(34, 197, 94, 0.45)',
      },
      borderRadius: {
        'card': '24px',
        'card-lg': '28px',
        'pill': '9999px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeSlideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        petalFall: {
          '0%': { transform: 'translate3d(0, -10px, 0) rotate(0deg)', opacity: '0' },
          '15%': { opacity: '0.8' },
          '100%': { transform: 'translate3d(60px, 100vh, 0) rotate(360deg)', opacity: '0' },
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.5s ease-in-out infinite',
        'fade-in': 'fadeIn 0.4s ease-out both',
        'fade-slide-up': 'fadeSlideUp 0.5s ease-out both',
        'petal': 'petalFall 9s linear infinite',
      }
    },
  },
  plugins: [],
}
