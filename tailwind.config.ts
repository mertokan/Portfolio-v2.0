import type {Config} from 'tailwindcss'
import {withUt} from 'uploadthing/tw'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx,mdx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: '#070d1b',
        foreground: '#ffffff',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        neutral: {
          0: 'rgb(253, 253, 253)',
          1: 'rgb(235, 238, 239)',
          2: 'rgb(204, 209, 210)',
          3: 'rgb(169 173 184)',
          4: 'rgb(153, 162, 165)',
          6: 'rgb(153, 162, 165)',
          8: 'rgb(36, 43, 51)',
          10: 'rgb(0, 23, 31)',
        },
        site: {
          darkcolor1: '#151b29',
          darkcolor2: '#070d1b',
          darkcolor3: '#0a101e',
          darkcolor4: '#101624',
          darkcolor5: '#3f4551',
        },
        state: {
          red: 'rgb(255, 86, 79)',
          green: 'rgb(52, 199, 89)',
          orange: 'rgb(255, 145, 44)',
          blue: 'rgb(0, 167, 231)',
          purple: 'rgb(94, 84, 142)',
          yellow: 'rgb(254, 197, 68)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        inherit: 'inherit',
      },
      keyframes: {
        'accordion-down': {
          from: {height: '0'},
          to: {height: 'var(--radix-accordion-content-height)'},
        },
        'accordion-up': {
          from: {height: 'var(--radix-accordion-content-height)'},
          to: {height: '0'},
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      objectPosition: {
        photo: '0% 20%',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
