import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Proxy API calls to backend during development. The backend Spring app
// usually runs on port 8080 — adjust if your backend uses another port.
export default defineConfig({
  plugins: [react()],
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
