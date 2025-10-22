import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Base path for subpath deployments (e.g., /preview/user1-project5/)
  base: process.env.VITE_BASE_PATH || '/',
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    proxy: {
      // Match /api with or without base path prefix
      '^(/preview/[^/]+)?/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => {
          // Remove base path prefix but keep /api
          // e.g., /preview/user5-project18/api/health -> /api/health
          return path.replace(/^\/preview\/[^/]+/, '')
        },
      },
    },
    hmr: {
      // Configure HMR WebSocket for proxy environments
      protocol: process.env.VITE_HMR_PROTOCOL || 'ws',
      host: process.env.VITE_HMR_HOST || undefined,
      clientPort: process.env.VITE_HMR_PORT ? parseInt(process.env.VITE_HMR_PORT) : 80,
    },
    watch: {
      // Use polling for reliable file watching in Docker containers
      usePolling: process.env.CHOKIDAR_USEPOLLING === 'true',
      interval: process.env.CHOKIDAR_INTERVAL ? parseInt(process.env.CHOKIDAR_INTERVAL) : 1000,
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
})
