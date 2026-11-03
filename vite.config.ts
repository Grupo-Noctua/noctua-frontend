import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

// Proxy API calls to backend during development. The backend Spring app
// usually runs on port 8080 — adjust if your backend uses another port.
export default defineConfig({
  plugins: [react()],
  // Keep generated cache outside OneDrive to avoid locked dependency files.
  cacheDir: join(tmpdir(), 'noctua-frontend-vite'),
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
