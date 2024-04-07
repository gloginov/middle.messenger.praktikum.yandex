import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist'
  },
  server: {
    host: '0.0.0.0',
    watch: {
      usePolling: true
    }
  }
})
