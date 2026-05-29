import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Das Stueck wird zu EINER eigenstaendigen index.html gebuendelt.
// JS und CSS werden inline gelegt, damit das Ergebnis als einzelne
// Datei oder als Link weitergegeben werden kann, ohne Backend.
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    assetsInlineLimit: 100_000_000,
    chunkSizeWarningLimit: 100_000_000,
  },
});
