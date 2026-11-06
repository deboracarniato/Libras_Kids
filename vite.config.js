import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Libras_Kids/' : '/',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
  },
}))
