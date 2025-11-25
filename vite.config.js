// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Tambahkan base path jika Anda tidak me-deploy ke root domain (tapi umumnya tidak diperlukan di Vercel)
  // base: '/', 
})
