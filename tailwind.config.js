/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A2458',
          light: '#1A3E7D',
          dark: '#051633',
        },
        secondary: {
          DEFAULT: '#B31942',
          light: '#D4426B',
          dark: '#8C1434',
        },
        accent: {
          DEFAULT: '#FFFFFF',
          light: '#FFFFFF',
          dark: '#F5F5F5',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        sans: ['Source Sans 3', 'sans-serif'],
        heading: ['Merriweather', 'serif'],
      },
      spacing: {
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}; 