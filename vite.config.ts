import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: '/ip-genius/',
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        strategies: 'generateSW',
        workbox: {
          navigateFallback: '/index.html',
          globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
          maximumFileSizeToCacheInBytes: 5000000,
        },
        manifest: {
          name: 'IP Genius',
          short_name: 'IP Genius',
          description: 'IP Genius: plataforma móvel de evolução gamificada para metas, missões, emblemas e ranking.',
          theme_color: '#1351b4',
          background_color: '#FFFFFF',
          display: 'standalone',
          orientation: 'portrait-primary',
          scope: '/ip-genius/',
          start_url: '/ip-genius/',
          icons: [
            {
              src: '/ip-genius/logo-ip-genius.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        }
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
