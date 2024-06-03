import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
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
    // eslint({
    //   exclude: ['node_modules/**'],
    //   fix: true,
    // }),
    stylelint({
      fix: true,
    })
  ],
})
