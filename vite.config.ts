/// <reference types="vitest" />
// Disable eslint errors since this is how vite comes configured out of the box
/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
/* eslint-enable import/no-extraneous-dependencies */

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      manifest: {
        name: 'Appdev Poker gevis1',
        short_name: 'Poker',
        description: 'A poker game',
        theme_color: '#00CC00',
        icons: [
          {
            src: 'poker-icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'poker-icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'poker-mask-icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
    // eslint-disable-next-line consistent-return
    onConsoleLog(log) {
      if (
        log.includes(
          'WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.',
        )
      ) return false;
      if (log.includes("Null value error. for 'create' @ L6")) return false;
    },
  },
});
