/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'off-white': '#F8F8F8',
        'warm-gray': {
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      letterSpacing: {
        'widest': '0.08em',
        'wider': '0.05em',
        'wide': '0.02em',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: '#44403C',
            lineHeight: '1.75',
            h1: {
              fontSize: '1.5rem',
              letterSpacing: '0',
              '@screen md': {
                fontSize: '1.875rem',
              },
            },
            'h2, h3, h4': {
              color: '#1C1917',
              fontWeight: '500',
              letterSpacing: '0.01em',
            },
            a: {
              color: '#44403C',
              textDecoration: 'none',
              borderBottom: '1px solid #D6D3D1',
              transition: 'border-color 0.2s ease',
              '&:hover': {
                borderColor: '#78716C',
              },
            },
            blockquote: {
              borderLeftColor: '#E7E5E4',
              color: '#57534E',
              fontStyle: 'italic',
            },
            hr: {
              borderColor: '#E7E5E4',
              margin: '3rem 0',
            },
            code: {
              color: '#44403C',
              backgroundColor: '#F5F5F4',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 