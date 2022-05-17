import { root } from '../common/runtime'
import { builtinModules } from 'module'
import { defineConfig } from 'vite'

export default defineConfig({
  root: __dirname,
  resolve: {
    alias: {
      '~': root,
    },
  },
  build: {
    outDir: '../../dist/main',
    emptyOutDir: true,
    minify: process.env.NODE_ENV === 'production',
    sourcemap: process.env.NODE_ENV !== 'production',
    lib: {
      entry: 'index.ts',
      formats: ['cjs'],
      fileName: () => '[name].cjs',
    },
    rollupOptions: {
      external: ['electron', ...builtinModules],
    },
  },
})
