/** @type {import('tailwindcss').Config} */
export default {
    content: [
      './frontend/**/*.{js,ts,jsx,tsx}',
      './frontend/index.html'
    ],
    theme: {
      extend: {
        borderRadius: {
          'xl': '1rem',
          '2xl': '1.5rem',
        },
        boxShadow: {
          'xl': '0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.6)',
        },
      },
    },
    plugins: [],
  };