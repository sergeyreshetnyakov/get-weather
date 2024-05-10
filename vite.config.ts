import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  plugins: [react(), mkcert()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: { https: true }
})
