import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // important
    allowedHosts: [
      '6496-117-252-23-234.ngrok-free.app'
    ]
  }
})