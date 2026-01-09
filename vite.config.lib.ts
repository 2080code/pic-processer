import { defineConfig } from 'vite'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    tsconfigPaths:true,
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    minify: 'terser',
    lib: {
      entry: resolve(__dirname, 'src/major/pic-processer.ts'),
      formats: ['es', 'umd','cjs'],
      name: 'PicProcesser',
      fileName: (format, entryName) => `${entryName}.${format}.js`,
    },
    sourcemap: true
  },
})
