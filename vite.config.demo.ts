import { defineConfig } from 'vite'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  preview: {
    port: 8081,
  },
  plugins: [
    vue(),
  ],
  resolve: {
    tsconfigPaths:true,
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'demo',
  },
})
