import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({

  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    define: {
      API_URL: JSON.stringify('https://ktt-api.onrender.com'), // Замените на нужный тестовый URL
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Убедитесь, что алиас настроен для Vitest
    },
  },
})
