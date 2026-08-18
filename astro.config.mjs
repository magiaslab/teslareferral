// @ts-check
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://teslareferral.it',
  trailingSlash: 'never',
  output: 'static',
  build: {
    inlineStylesheets: 'always',
  },
  redirects: {
    '/guida/come-funziona-il-referral-tesla': '/come-funziona',
    '/referral-tesla-model-y': '/model-y',
    '/referral-tesla-model-3': '/model-3',
    '/referral-tesla-model-s': '/come-funziona',
    '/referral-tesla-model-x': '/come-funziona',
    '/prezzi': '/prezzo-incentivi',
    '/incentivi': '/prezzo-incentivi',
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
