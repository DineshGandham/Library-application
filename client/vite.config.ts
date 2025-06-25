import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
    server: {
    host: '0.0.0.0', // Important for Docker
    port: 5173,
    watch: {
      usePolling: true, // Important for hot reload in Docker
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
  },
})
