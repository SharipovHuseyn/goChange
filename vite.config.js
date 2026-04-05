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

export default defineConfig({
  plugins: [react()],
  build: {
    // Увеличиваем лимит памяти
    chunkSizeWarningLimit: 1000,
    // Оптимизируем сборку
    rollupOptions: {
      output: {
        manualChunks: {
          // Разделяем большие зависимости на отдельные чанки
          vendor: ['react', 'react-dom', 'react-router-dom'],
          antd: ['antd'],
          icons: ['@ant-design/icons', 'react-icons'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
        },
      },
    },
    // Уменьшаем количество потоков для экономии памяти
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Отключаем source maps для продакшена
    sourcemap: false,
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://api.gochange.tech',
        changeOrigin: true,
      },
    },
  },
  // Оптимизация зависимостей
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'antd'],
    exclude: ['large-svg-files'], // если есть
  },
})