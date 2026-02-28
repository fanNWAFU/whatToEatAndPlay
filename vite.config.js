import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// 这是网页的“大脑”，一定要放在根目录的 vite.config.js 里！
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})