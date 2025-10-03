import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), // habilita JSX e funcionalidades React
    tailwindcss()], // integra Tailwind com o vite
  base: 'MercApp'
})
