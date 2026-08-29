import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'torque-icon.svg'],
      manifest: {
        name: 'Torque — Fluids for the drive',
        short_name: 'Torque',
        description: 'Premium oils, fluids and filters matched to your car.',
        theme_color: '#0B0D10',
        background_color: '#0B0D10',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/torque-icon.svg', sizes: '192x192', type: 'image/svg+xml', purpose: 'any maskable' },
          { src: '/torque-icon.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'any maskable' },
        ],
      },
      workbox: { navigateFallback: '/' },
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
