import { defineConfig } from 'vite'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { viteStaticCopy } from 'vite-plugin-static-copy'


const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    tsconfigPaths:true,
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'src/major/pic-processer.d.ts',
          dest: resolve(__dirname, './dist/types'),
        },
      ],
    }),
  ],
  build: {
    outDir: resolve(__dirname, './dist'),
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
