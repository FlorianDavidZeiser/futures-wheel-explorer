# Aus der Zeit gefallen

Ein kurzes, ruhiges, visuell dichtes Erlebnis. Ein begehbarer Gedanke.

Es fuehrt durch vier verschwundene Berufe der letzten rund hundert Jahre, jeden
als lebendes Bild mit einer kurzen Geschichte. Eine Jahreszahl steigt dabei
stetig an und laeuft auf die Gegenwart zu. Im Moment des Heute wird der Betrachter
selbst zur naechsten Station in dieser Reihe, und die Zeit laeuft weiter ueber ihn
hinweg.

Es ist kein Werkzeug, kein Spiel, keine Simulation. Es doziert nie und spricht
keine Moral aus. Die Einsicht entsteht im Kopf des Betrachters.

## Technik

- React, Vite, TypeScript
- Tailwind CSS mit eigenen Design-Tokens als CSS-Variablen, besonders fuer den Temperaturbogen
- Framer Motion fuer die Uebergaenge und die kleinen Szenen-Bewegungen
- SVG fuer die vier lebenden Bilder
- React Context und useReducer fuer den schlanken State
- Kein Backend, alles statisch

## Entwicklung

```bash
npm install
npm run dev      # lokaler Entwicklungsserver
npm run build    # Produktionsbuild
npm run preview  # gebautes Ergebnis lokal ansehen
```

## Auslieferung

`npm run build` erzeugt eine **einzige, in sich geschlossene** Datei:

```
dist/index.html
```

JavaScript und CSS liegen darin inline. Die Datei kann als Link gehostet oder als
einzelne Datei weitergegeben werden, ohne Backend. Die Webfonts (Fraunces, Inter)
werden online nachgeladen, fehlen sie, greifen robuste System-Serif und
System-Sans, das Stueck bleibt voll funktionsfaehig.

## Aufbau

```
src/
  components/
    intro/      Eingang, Titel, Berufsfrage
    station/    Wiederverwendbarer Aufbau einer Station, Rahmen, Jahreszahl
    scenes/     Die SVG-Szenen, je eine Komponente
    today/      Schnitt ins Heute
    outro/      Die Wendung und der Ausklang
    ui/         Funktionale Elemente
  data/
    content.ts  Alle woertlichen Texte
  state/        ExperienceContext und reducer
  styles/       Palette, Temperaturbogen, museale Patina, Animationsgrundsaetze
  App.tsx       Die Buehne, Temperaturbogen und durchlaufende Jahreszahl
  main.tsx
```

## Barrierefreiheit

Die Einstellung `prefers-reduced-motion` wird respektiert. Ist sie aktiv, werden
alle Bewegungen auf einfache, kurze Fades reduziert, und das Hochzaehlen der
Jahreszahl wird zu einem schlichten Wechsel.
