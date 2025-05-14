import { defineConfig } from 'vite';

/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
  base: '/',
  build: {
    sourcemap: true,
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  publicDir: 'public'
});