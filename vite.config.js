import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5002',
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('error', (_error, _req, res) => {
            if (!res || res.headersSent || typeof res.writeHead !== 'function') return;
            res.writeHead(503, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              success: false,
              message: 'API server is not running. Start it with npm run server.',
            }));
          });
        },
      },
    },
  },
  preview: {
    proxy: {
      '/api': {
        target: 'http://localhost:5002',
        changeOrigin: true,
      },
    },
  },
})
