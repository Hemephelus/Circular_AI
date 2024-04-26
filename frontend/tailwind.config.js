/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'fluid-sm': 'repeat(auto-fill, minmax(50px, 1fr))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}