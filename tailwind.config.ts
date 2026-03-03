import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    'bg-blue-900',
    'bg-red-900',
    'bg-green-900',
    'ring-blue-400',
    'ring-red-400',
    'ring-green-400',
    'text-blue-300',
    'text-red-300',
    'text-green-300',
  ],
  theme: {
    extend: {
      animation: {
        'breathe-crudo': 'breathe-crudo 4s ease-in-out infinite',
        'pulse-realidad': 'pulse-realidad 2s infinite',
        'fadeIn': 'fadeIn 0.3s ease-out',
        'scaleIn': 'scaleIn 0.3s ease-out',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        'breathe-crudo': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.7' },
        },
        'pulse-realidad': {
          '0%': { boxShadow: '0 0 0 0 rgba(248, 113, 113, 0.7)' },
          '70%': { boxShadow: '0 0 0 10px rgba(248, 113, 113, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(248, 113, 113, 0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scaleIn: {
          from: { transform: 'scale(0.9)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
