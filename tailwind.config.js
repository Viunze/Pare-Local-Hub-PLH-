// tailwind.config.js (Di root proyek)

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Tambahkan path ke semua file JSX/JS/TSX/TS/HTML di mana Anda menggunakan kelas Tailwind
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
