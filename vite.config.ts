import { sentryVitePlugin } from '@sentry/vite-plugin'
//--no-ignore
import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { VitePWA } from 'vite-plugin-pwa'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

import tailwindcss from 'tailwindcss'

const baseURL: string = 'https://api.bitmail.app/api/v1'
const time = 60 * 60 * 24 * 365
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 3000,
  },
  optimizeDeps: {
    include: ['xlsx'],
    exclude: [],
  },
  plugins: [
    svgr(),
    tsconfigPaths(),
    nodePolyfills(),
    VitePWA({
      strategies: 'generateSW',
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'mask-icon.svg',
        'fonts/roboto/*.ttf',
        'images/pwa/*png',
        'intro/*gif',
      ],
      manifest: {
        name: 'Bitmail',
        short_name: 'Bitmail',
        description: 'Bitmail',
        theme_color: '#ffffff',
        display: 'standalone',
        display_override: ['window-controls-overlay'],
        icons: [
          {
            src: 'images/pwa/icon-48.webp', //images/pwa/icon-48x48.png
            type: 'image/png',
            sizes: '48x48',
            purpose: 'any maskable',
          },
          {
            src: 'images/pwa/icon-72.webp',
            type: 'image/png',
            sizes: '72x72',
            purpose: 'any maskable',
          },
          {
            src: 'images/pwa/icon-96.webp',
            type: 'image/png',
            sizes: '96x96',
            purpose: 'any maskable',
          },
          {
            src: 'images/pwa/icon-128.webp',
            type: 'image/png',
            sizes: '128x128',
            purpose: 'any maskable',
          },
          {
            src: 'images/pwa/icon-192.webp',
            type: 'image/png',
            sizes: '192x192',
            purpose: 'any maskable',
          },
          {
            src: 'images/pwa/icon-256.webp',
            type: 'image/png',
            sizes: '256x256',
            purpose: 'any maskable',
          },
          {
            src: 'images/pwa/icon-512.webp',
            type: 'image/png',
            sizes: '512x512',
            purpose: 'any maskable',
          },
        ],
        screenshots: [
          {
            src: 'images/pwa/icon-512x512.png',
            sizes: '512x512',
            type: 'image/gif',
            label: 'Wonder Widgets',
          },
        ],
      },
      workbox: {
        importScripts: ['inject-sw.js'],
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,ttf,gif}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },
    }),
    sentryVitePlugin({
      org: 'sentry',
      project: 'bitmail-interface',
      url: process.env.VITE_APP_SENTRY_URL,
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
})
