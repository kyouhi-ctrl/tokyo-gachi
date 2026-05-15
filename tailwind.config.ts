import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans SC"', '"Noto Sans JP"', 'system-ui', 'sans-serif'],
        display: ['"Noto Serif JP"', 'serif'],
      },
      colors: {
        ink: {
          50: '#f7f7f5',
          100: '#ededea',
          200: '#d6d6d0',
          300: '#b8b8af',
          400: '#8e8e83',
          500: '#6b6b62',
          600: '#4d4d46',
          700: '#36362f',
          800: '#23231f',
          900: '#161613',
        },
        brand: {
          50: '#fef3f2',
          100: '#fee4e2',
          200: '#fecdca',
          300: '#fda4a0',
          400: '#f97167',
          500: '#ef4136',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        cardHover: '0 12px 28px rgba(0,0,0,0.10), 0 4px 10px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
};

export default config;
