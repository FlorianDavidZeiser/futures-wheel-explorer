/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Ruhige, hochwertige Serif fuer Titel, Jahreszahl, Berufsnamen, Geschichten.
        serif: [
          'Fraunces',
          'Source Serif 4',
          'Source Serif Pro',
          'Iowan Old Style',
          'Palatino Linotype',
          'Georgia',
          'Cambria',
          'serif',
        ],
        // Zurueckhaltende Sans nur fuer funktionale Elemente.
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
