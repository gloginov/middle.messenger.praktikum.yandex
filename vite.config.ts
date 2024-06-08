import { defineConfig } from 'vite';
import stylelint from 'vite-plugin-stylelint';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist'
  },
  base: './',
  server: {
    host: '0.0.0.0',
    watch: {
      usePolling: true
    }
  },
  plugins: [
    stylelint({
      fix: true,
    })
  ],
})
