import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Base path for GitHub Pages — update to /your-repo-name/ for GH Pages deployment
  // base: '/portfolio/',
  server: {
    port: 5173,
    proxy: {
      // Dev proxy: forward /api/* to the FastAPI backend
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
