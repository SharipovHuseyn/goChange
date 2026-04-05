import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [
    tailwindcss(),
    react(),
    svgr(),
  ],
  exclude: [
    'srv/**',
  ],
})
