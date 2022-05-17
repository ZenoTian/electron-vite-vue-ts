import { join } from 'path'
import { builtinModules } from 'module'
import { defineConfig } from 'vite'

import { root } from '../common/runtime'

export default defineConfig({
  root: __dirname,
  resolve: {
    alias: {
      '~': root,
    },
  },
  build: {
    outDir: '../../dist/preload',
    emptyOutDir: true,
    minify: process.env.NODE_ENV === 'production',
    sourcemap: process.env.NODE_ENV !== 'production',
    rollupOptions: {
      input: {
        // multiple entry
        index: join(__dirname, 'index.ts'),
      },
      output: {
        format: 'cjs',
        entryFileNames: '[name].cjs',
        manualChunks: {},
      },
      external: ['electron', ...builtinModules],
    },
  },
})
