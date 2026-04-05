// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import svgr from 'vite-plugin-svgr'
// import tailwindcss from '@tailwindcss/vite'

// // https://vitejs.dev/config/
// export default defineConfig({
//   base: '',
//   plugins: [
//     tailwindcss(),
//     react(),
//     svgr(),
//   ],
//   exclude: [
//     'srv/**',
//   ],
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        // Оптимизация SVG
        plugins: ['@svgr/plugin-svgo'],
        svgoConfig: {
          plugins: [
            'preset-default',
            'removeViewBox',
            'removeDimensions',
            'minifyStyles',
          ],
        },
      },
    }),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          antd: ['antd'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
        },
      },
    },
    sourcemap: false,
    // Увеличиваем таймаут для больших файлов
    assetsInlineLimit: 4096,
  },
})