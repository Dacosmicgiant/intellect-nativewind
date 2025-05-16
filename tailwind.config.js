/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0075FF',
          50: '#E6F0FF',
          100: '#CCE0FF',
          200: '#99C1FF',
          300: '#66A3FF',
          400: '#3384FF',
          500: '#0075FF',
          600: '#005ECC',
          700: '#004799',
          800: '#002F66',
          900: '#001833',
        },
        neutral: {
          DEFAULT: '#6B7280',
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        success: {
          DEFAULT: '#34C759',
          lighter: '#E6F7ED',
          light: '#C8E6C9',
          dark: '#2E7D32',
        },
        error: {
          DEFAULT: '#FF3B30',
          lighter: '#FFEBEB',
          light: '#FFCDD2',
          dark: '#C62828',
        },
        warning: {
          DEFAULT: '#FF9500',
          lighter: '#FFF8E1',
          light: '#FFE082',
          dark: '#F57C00',
        },
        info: {
          DEFAULT: '#0066FF',
          lighter: '#E3F2FD',
          light: '#90CAF9',
          dark: '#1565C0',
        },
      },
      fontFamily: {
        sans: ['winky'],
        bold: ['winky-bold'],
      },
    },
  },
  plugins: [],
};