import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  devToolbar: { enabled: false },
  site: 'https://spital-repub-timofei-mosneaga.netlify.app',
  outDir: './dist',
  build: {
    assets: '_astro'
  }
});