/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: '"Space Grotesk", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        syne: '"Syne", system-ui, sans-serif',
        heading: '"Syne", system-ui, sans-serif',
      },
      colors: {
        bg: {
          primary:   '#0a0a0f',
          secondary: '#0d0d1a',
          card:      '#111127',
        },
        accent: {
          cyan:   '#00f5ff',
          violet: '#7c3aed',
          green:  '#00ff88',
        },
        content: {
          primary: '#f0f0ff',
          muted:   '#8888aa',
        },
        glow: 'rgba(0, 245, 255, 0.2)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-glow':
          'linear-gradient(rgba(0,245,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.04) 1px, transparent 1px)',
      },
      boxShadow: {
        'glow-cyan':    '0 0 24px rgba(0, 245, 255, 0.35)',
        'glow-cyan-lg': '0 0 48px rgba(0, 245, 255, 0.45)',
        'glow-violet':  '0 0 24px rgba(124, 58, 237, 0.45)',
        'glow-green':   '0 0 24px rgba(0, 255, 136, 0.4)',
      },
      animation: {
        'bounce-slow':  'bounce 3s infinite',
        'pulse-slow':   'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backdropBlur: {
        '4xl': '72px',
      },
    },
  },
  // daisyUI removed — we use custom CSS utilities
  plugins: [],
};
