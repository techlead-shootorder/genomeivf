/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Your existing color system
        'primary': {
          DEFAULT: '#874487',
          50: '#672658',
        },
        'secondary': '#7E3E7E',
        'accent': '#FF8100',
        'neutral': '#525252',
        'bglight': '#e1d6ec',
        'bgtransparent': '#672658f2',
        
        // Oasis color system
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        'primary-oasis': {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        'oasis-orange': 'hsl(var(--oasis-orange))',
        'oasis-purple': 'hsl(var(--oasis-purple))',
        'oasis-violet': 'hsl(var(--oasis-violet))',
        'oasis-pink-light': 'hsl(var(--oasis-pink-light))',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        inter: ['var(--font-inter)'],
        questrial: ['var(--font-questrial)'],
        lato: ['var(--font-lato)'],
        lato_light: ['var(--font-lato_light)'],
        cormorant_garamond: ['var(--font-cormorant_garamond)'],
        pattaya: ['var(--font-pattaya)'],
        poppins: ['var(--font-poppins)'],
        helvetica: ['Helvetica', 'Arial', 'sans-serif'],
      },
      screens: {
        'xs': { 'max': '370px' },
        '3xl': '1920px',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(180deg, rgb(0 0 0 / 100%) -20%, transparent 50%, rgb(0 0 0 / 90%) 100%)',
        'custom-gradient2': 'linear-gradient(101deg, rgba(0,0,0,0.865983893557423) 5%, rgba(242,242,242,0.006039915966386533) 30%, rgba(231,234,240,0) 100%)',
        'infertility-bg-img': "url('https://images.oasisindia.in/website/Treatment/background-img.png')",
        'announcement-bar-gradient': 'linear-gradient(90deg, #fbc2eb 18%, #f6c2eb 0, #a6c1ee 78%)',
      },
      animation: {
        marquee: 'marquee 10s linear infinite',
        slide: 'slide 12s infinite ease-in-out',
        'spin-slow': 'spin 5s linear infinite',
        'spin-reverse': 'spin-reverse 5s linear infinite',
        ripple: 'ripple 2s infinite',
        pulseHighlight: 'pulseHighlight 1.5s infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        pulseHighlight: {
          '0%, 100%': { backgroundColor: '#D7052B' },
          '50%': { backgroundColor: '#ff4b4b' },
        },
        slide: {
          '0%, 20%': { transform: 'translateY(0%)' },
          '25%, 45%': { transform: 'translateY(-100%)' },
          '50%, 70%': { transform: 'translateY(-200%)' },
          '75%, 100%': { transform: 'translateY(-0%)' },
        },
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        ripple: {
          '0%': { transform: 'scale(0.9)', opacity: '1' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};